import { Component, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NavbarComponent } from '../navbar/navbar.component';
import {CustomerDTO} from '../banking-dtos';
import {BankingService} from '../services/banking.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    NavbarComponent
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="container">
      <ng-container *ngIf="isAdmin; else userView">
        <h2>Customers</h2>

        <div class="search-container">
          <mat-form-field appearance="outline" class="full-width search-field">
            <mat-label>Search Customers</mat-label>
            <input matInput [(ngModel)]="searchKeyword" (input)="onSearchChange($event)" placeholder="Search by name or email">
            <mat-icon matPrefix>search</mat-icon>
            <button *ngIf="searchKeyword" matSuffix mat-icon-button aria-label="Clear" (click)="clearSearch()">
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>
        </div>

        <div class="table-container card">
          <table mat-table [dataSource]="customers" *ngIf="customers.length > 0 || isLoading">
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID</th>
              <td mat-cell *matCellDef="let customer">{{ customer.id }}</td>
            </ng-container>
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let customer">{{ customer.name }}</td>
            </ng-container>
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let customer">{{ customer.email }}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let customer">
                <button mat-raised-button class="action-button" [routerLink]="['/customers/edit', customer.id]">Edit</button>
                <button mat-raised-button class="action-button delete-button" (click)="deleteCustomer(customer.id)">Delete</button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </div>

        <div *ngIf="customers.length === 0 && !isLoading" class="no-results">
          No customers found. Try a different search term or refresh the page.
        </div>

        <div class="button-container">
          <button mat-raised-button class="action-button" routerLink="/customers/new">Add Customer</button>
        </div>
      </ng-container>

      <ng-template #userView>
        <div class="unauthorized-message">
          <h2>Unauthorized Access</h2>
          <p>You do not have permission to manage customers.</p>
          <button mat-raised-button class="action-button" routerLink="/login">Back to Login</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    h2 {
      font-size: 2rem;
      font-weight: 400;
    }
    .table-container {
      overflow-x: auto;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 10px;
      text-align: left;
      font-family: 'Roboto', sans-serif;
    }
    th {
      background-color: #00695C;
      color: #FFFFFF;
    }
    tr {
      background-color: #FFFFFF;
      transition: background-color 0.3s ease;
    }
    tr:hover {
      background-color: #F5F5F5;
    }
    .search-container {
      width: 100%;
      margin-bottom: 20px;
    }
    .full-width {
      width: 100%;
    }
    .search-field {
      background-color: #FFFFFF;
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .no-results {
      text-align: center;
      margin: 20px 0;
      font-style: italic;
      color: #666;
      font-family: 'Roboto', sans-serif;
    }
    .button-container {
      margin-top: 20px;
    }
    .action-button {
      background-color: #FF6F61;
      color: #FFFFFF;
      font-family: 'Roboto', sans-serif;
    }
    .action-button:hover {
      background-color: #E65A50;
    }
    .delete-button {
      background-color: #d32f2f;
    }
    .delete-button:hover {
      background-color: #b02828;
    }
    .unauthorized-message {
      text-align: center;
      margin-top: 50px;
    }
    .unauthorized-message h2 {
      color: #d32f2f;
    }
    .unauthorized-message p {
      margin: 20px 0;
      font-family: 'Roboto', sans-serif;
    }
  `]
})
export class CustomerListComponent implements OnInit {
  customers: CustomerDTO[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  searchKeyword: string = '';
  private searchSubject = new Subject<string>();
  isLoading: boolean = true;
  isAdmin: boolean = false;

  constructor(
    public authService: AuthService,
    private bankingService: BankingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(keyword => {
      this.searchCustomers(keyword);
    });
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      this.isLoading = false;
      return; // Skip initialization during SSR
    }

    const tokenPayload = this.authService.decodeToken();
    this.isAdmin = tokenPayload?.roles?.includes('ROLE_ADMIN') || false;

    if (!this.authService.isAuthenticated()) {
      console.warn('User not authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }

    if (!this.isAdmin) {
      console.warn('Unauthorized access attempt to CustomerListComponent');
      this.router.navigate(['/unauthorized']);
      return;
    }

    this.loadAllCustomers();
  }

  loadAllCustomers() {
    this.isLoading = true;
    this.bankingService.getCustomers().subscribe({
      next: (customers: CustomerDTO[]) => {
        this.customers = customers;
        console.log('Loaded customers:', customers);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Load customers error:', err);
        this.bankingService.showError(`Failed to load customers: ${err.status || 'Unknown error'}`);
        this.customers = [];
        this.isLoading = false;
        this.cdr.detectChanges();
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

    this.isLoading = true;
    console.log('Searching customers with keyword:', keyword);
    this.bankingService.searchCustomers(keyword).subscribe({
      next: (customers: CustomerDTO[]) => {
        this.customers = customers;
        console.log('Search results:', customers);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Search customers error:', err);
        this.bankingService.showError(`Failed to search customers: ${err.status} ${err.statusText}`);
        this.customers = [];
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteCustomer(id: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      console.log('Deleting customer:', id);
      this.bankingService.deleteCustomer(id).subscribe({
        next: () => {
          console.log('Customer deleted:', id);
          this.bankingService.showSuccess('Customer deleted successfully');
          if (this.searchKeyword && this.searchKeyword.trim() !== '') {
            this.searchCustomers(this.searchKeyword);
          } else {
            this.loadAllCustomers();
          }
        },
        error: (err: any) => {
          console.error('Delete customer error:', err);
          this.bankingService.showError(`Failed to delete customer: ${err.status} ${err.statusText}`);
        }
      });
    }
  }
}
