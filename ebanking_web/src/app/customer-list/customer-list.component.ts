import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {BankingService, CustomerDTO} from '../services/banking.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
  template: `
    <h2>Customers</h2>
    <button mat-raised-button color="primary" (click)="addCustomer()">Add Customer</button>
    <div *ngIf="loading">Loading customers...</div>
    <div *ngIf="!loading && customers.length === 0">No customers found.</div>
    <table mat-table [dataSource]="customers" class="mat-elevation-z8" *ngIf="customers.length > 0">
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
          <button mat-button color="primary" (click)="editCustomer(customer.id)">Edit</button>
          <button mat-button color="warn" (click)="deleteCustomer(customer.id)">Delete</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [`
    table { width: 100%; margin-top: 20px; }
    button { margin-right: 10px; }
  `]
})
export class CustomerListComponent implements OnInit {
  customers: CustomerDTO[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  loading: boolean = true;

  constructor(
    private bankingService: BankingService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    console.log('CustomerListComponent: ngOnInit');
    if (isPlatformBrowser(this.platformId)) {
      console.log('CustomerListComponent: Running in browser, fetching customers');
      this.bankingService.getCustomers().subscribe({
        next: customers => {
          this.customers = customers;
          this.loading = false;
          console.log('CustomerListComponent: Customers loaded:', customers);
        },
        error: err => {
          this.loading = false;
          console.error('CustomerListComponent: Error loading customers:', err);
          this.bankingService.showError(`Failed to load customers: ${err.message || err}`);
        }
      });
    } else {
      console.log('CustomerListComponent: Running on server, skipping HTTP request');
      this.loading = false;
    }
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
