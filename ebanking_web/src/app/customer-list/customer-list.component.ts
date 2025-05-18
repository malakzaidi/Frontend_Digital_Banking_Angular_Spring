import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankingService, CustomerDTO } from '../services/banking.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule
  ],
  template: `
    <div class="container">
      <h2>Customers</h2>

      <div class="search-container">
        <mat-form-field appearance="outline" class="full-width search-field">
          <mat-label>Search Customers</mat-label>
          <input matInput [(ngModel)]="searchKeyword" (input)="onSearchChange($event)" placeholder="Search by ID, name or email">
          <mat-icon matPrefix>search</mat-icon>
          <button *ngIf="searchKeyword" matSuffix mat-icon-button aria-label="Clear" (click)="clearSearch()">
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>
      </div>

      <div class="button-row">
        <button mat-raised-button color="primary" (click)="addCustomer()">Add Customer</button>
      </div>

      <div *ngIf="loading" class="loading">Loading customers...</div>
      <div *ngIf="!loading && customers.length === 0" class="no-results">No customers found.</div>

      <div class="table-container mat-elevation-z8" *ngIf="customers.length > 0">
        <table mat-table [dataSource]="customers">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> ID </th>
            <td mat-cell *matCellDef="let customer"> {{ customer.id }} </td>
          </ng-container>

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef> Name </th>
            <td mat-cell *matCellDef="let customer"> {{ customer.name }} </td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef> Email </th>
            <td mat-cell *matCellDef="let customer"> {{ customer.email }} </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef> Actions </th>
            <td mat-cell *matCellDef="let customer">
              <button mat-raised-button color="primary" (click)="editCustomer(customer.id)">Edit</button>
              <button mat-raised-button color="warn" (click)="deleteCustomer(customer.id)">Delete</button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .table-container {
      overflow-x: auto;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
    }
    button {
      margin-right: 10px;
    }
    .search-container {
      width: 100%;
      margin-bottom: 20px;
    }
    .button-row {
      margin-bottom: 20px;
    }
    .full-width {
      width: 100%;
    }
    .search-field {
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .search-field .mat-form-field-flex {
      background-color: white;
      border: 1px solid #ddd;
    }
    .loading {
      padding: 20px;
      text-align: center;
      color: #666;
    }
    .no-results {
      text-align: center;
      margin: 20px 0;
      font-style: italic;
      color: #666;
    }
  `]
})
export class CustomerListComponent implements OnInit {
  customers: CustomerDTO[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  loading: boolean = true;
  searchKeyword: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private bankingService: BankingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Set up debounce for search to avoid too many API calls
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(keyword => {
      this.searchCustomers(keyword);
    });
  }

  ngOnInit() {
    console.log('CustomerListComponent: ngOnInit');
    if (isPlatformBrowser(this.platformId)) {
      console.log('CustomerListComponent: Running in browser, fetching customers');
      this.loadAllCustomers();
    } else {
      console.log('CustomerListComponent: Running on server, skipping HTTP request');
      this.loading = false;
    }
  }

  loadAllCustomers() {
    this.loading = true;
    this.bankingService.getCustomers().subscribe({
      next: customers => {
        this.customers = customers;
        this.loading = false;
        console.log('CustomerListComponent: Customers loaded with full details:', JSON.stringify(customers));
        // Check if emails exist in the data
        const hasEmails = customers.some(customer => customer.email !== undefined && customer.email !== null);
        console.log('CustomerListComponent: Data has email values:', hasEmails);
      },
      error: err => {
        this.loading = false;
        console.error('CustomerListComponent: Error loading customers:', err);
        this.bankingService.showError(`Failed to load customers: ${err.message || err}`);
      }
    });
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  clearSearch() {
    this.searchKeyword = '';
    this.loadAllCustomers();
  }

  searchCustomers(keyword: string) {
    if (!keyword || keyword.trim() === '') {
      this.loadAllCustomers();
      return;
    }

    this.loading = true;
    console.log('Searching customers with keyword:', keyword);
    this.bankingService.searchCustomers(keyword).subscribe({
      next: customers => {
        this.customers = customers;
        this.loading = false;
        console.log('Search results:', customers);
      },
      error: err => {
        this.loading = false;
        console.error('Search customers error:', err);
        this.bankingService.showError(`Failed to search customers: ${err.status} ${err.statusText}`);
      }
    });
  }

  addCustomer() {
    console.log('CustomerListComponent: Navigating to add customer');
    this.router.navigate(['/customers/new']);
  }

  editCustomer(id: number) {
    console.log('CustomerListComponent: Navigating to edit customer:', id);
    this.router.navigate(['/customers/edit', id]);
  }

  deleteCustomer(id: number) {
    console.log('CustomerListComponent: Deleting customer:', id);
    if (confirm('Are you sure you want to delete this customer?')) {
      this.bankingService.deleteCustomer(id).subscribe({
        next: () => {
          this.customers = this.customers.filter(c => c.id !== id);
          console.log('CustomerListComponent: Customer deleted:', id);
        },
        error: err => {
          console.error('CustomerListComponent: Delete error:', err);
        }
      });
    }
  }
}
