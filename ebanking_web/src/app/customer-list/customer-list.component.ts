import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BankingService, CustomerDTO} from '../services/banking.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatInputModule, MatFormFieldModule, RouterLink, CommonModule, FormsModule],
  template: `
    <h2>Customers</h2>
    <mat-form-field>
      <mat-label>Search</mat-label>
      <input matInput [(ngModel)]="searchKeyword" (input)="searchCustomers()" placeholder="Enter name or email">
    </mat-form-field>
    <table mat-table [dataSource]="customers" class="mat-elevation-z8">
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
          <button mat-raised-button color="primary" [routerLink]="['/customers/edit', customer.id]">Edit</button>
          <button mat-raised-button color="warn" (click)="deleteCustomer(customer.id)">Delete</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <button mat-raised-button color="primary" routerLink="/customers/new">Add Customer</button>
  `,
  styles: [`
    table { width: 100%; margin-bottom: 20px; }
    mat-form-field { width: 100%; margin-bottom: 20px; }
    button { margin-right: 10px; }
  `]
})
export class CustomerListComponent implements OnInit {
  customers: CustomerDTO[] = [];
  searchKeyword: string = '';
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.bankingService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }

  searchCustomers() {
    if (this.searchKeyword.trim()) {
      this.bankingService.searchCustomers(this.searchKeyword).subscribe(customers => {
        this.customers = customers;
      });
    } else {
      this.loadCustomers();
    }
  }

  deleteCustomer(id: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.bankingService.deleteCustomer(id).subscribe(() => {
        this.loadCustomers();
      });
    }
  }
}
