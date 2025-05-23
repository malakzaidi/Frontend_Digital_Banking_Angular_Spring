import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import {CustomerDTO} from '../banking-dtos';
import {BankingService} from '../services/banking.service';


@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="container">
      <h2>{{ isEditMode ? 'Edit Customer' : 'Add Customer' }}</h2>
      <form (ngSubmit)="saveCustomer()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Name</mat-label>
          <input matInput [(ngModel)]="customer.name" name="name" required>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput [(ngModel)]="customer.email" name="email" type="email" required>
        </mat-form-field>
        <div class="button-container">
          <button mat-raised-button color="primary" type="submit" [disabled]="!customer.name || !customer.email">
            {{ isEditMode ? 'Update' : 'Save' }}
          </button>
          <button mat-raised-button color="warn" type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
    }
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .button-container {
      display: flex;
      gap: 10px;
    }
  `]
})
export class CustomerFormComponent implements OnInit {
  customer: CustomerDTO = { name: '', email: '' };
  isEditMode: boolean = false;

  constructor(
    private bankingService: BankingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bankingService.getCustomer(+id).subscribe({
        next: (customer: CustomerDTO) => {
          this.customer = customer;
        },
        error: (err: any) => {
          console.error('Load customer error:', err);
          this.bankingService.showError('Failed to load customer');
        }
      });
    }
  }

  saveCustomer() {
    const operation = this.isEditMode
      ? this.bankingService.updateCustomer(this.customer)
      : this.bankingService.saveCustomer(this.customer);

    operation.subscribe({
      next: (response: CustomerDTO) => {
        this.bankingService.showSuccess(this.isEditMode ? 'Customer updated successfully' : 'Customer created successfully');
        this.router.navigate(['/customers']);
      },
      error: (err: any) => {
        console.error('Save customer error:', err);
        this.bankingService.showError('Failed to save customer');
      }
    });
  }

  cancel() {
    this.router.navigate(['/customers']);
  }
}
