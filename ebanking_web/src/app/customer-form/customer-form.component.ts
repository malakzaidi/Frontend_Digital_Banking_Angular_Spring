import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {BankingService, CustomerDTO} from '../services/banking.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  template: `
    <h2>{{ isEdit ? 'Edit Customer' : 'Add Customer' }}</h2>
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error" class="error">{{ error }}</div>
    <form *ngIf="!loading" (ngSubmit)="saveCustomer()">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="customer.name" name="name" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="customer.email" name="email" type="email" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="!customer.name || !customer.email">Save</button>
      <button mat-raised-button color="accent" type="button" (click)="cancel()">Cancel</button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 20px; max-width: 400px; }
    button { margin-right: 10px; }
    .error { color: red; margin-bottom: 10px; }
  `]
})
export class CustomerFormComponent implements OnInit {
  customer: CustomerDTO = { name: '', email: '' };
  isEdit: boolean = false;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private bankingService: BankingService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    console.log('CustomerFormComponent: ngOnInit');
    const id = this.route.snapshot.paramMap.get('id');
    console.log('CustomerFormComponent: Route ID:', id);
    if (id) {
      this.isEdit = true;
      if (isPlatformBrowser(this.platformId)) {
        this.loading = true;
        console.log('CustomerFormComponent: Fetching customer ID:', id);
        this.bankingService.getCustomer(+id).subscribe({
          next: customer => {
            this.customer = customer;
            this.loading = false;
            console.log('CustomerFormComponent: Customer loaded:', customer);
          },
          error: err => {
            this.error = `Failed to load customer: ${err.status || 'Unknown'} ${err.statusText || err.message}`;
            this.loading = false;
            console.error('CustomerFormComponent: Error loading customer:', err);
            this.bankingService.showError(this.error);
          }
        });
      } else {
        console.log('CustomerFormComponent: Skipping fetch on server-side');
        this.loading = false;
      }
    } else {
      console.log('CustomerFormComponent: New customer mode');
      this.loading = false;
    }
  }

  saveCustomer() {
    console.log('CustomerFormComponent: Saving customer:', this.customer);
    if (!this.customer.name || !this.customer.email) {
      console.warn('CustomerFormComponent: Validation failed: Name or email missing');
      this.bankingService.showError('Name and email are required');
      return;
    }
    if (this.isEdit && !this.customer.id) {
      console.warn('CustomerFormComponent: Validation failed: Customer ID missing');
      this.bankingService.showError('Customer ID is missing');
      return;
    }
    const observable = this.isEdit
      ? this.bankingService.updateCustomer(this.customer)
      : this.bankingService.saveCustomer(this.customer);
    observable.subscribe({
      next: response => {
        console.log('CustomerFormComponent: Customer saved:', response);
        this.router.navigate(['/customers']);
      },
      error: err => {
        console.error('CustomerFormComponent: Save error:', err);
        this.bankingService.showError(`Failed to save customer: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
      }
    });
  }

  cancel() {
    console.log('CustomerFormComponent: Canceling');
    this.router.navigate(['/customers']);
  }
}
