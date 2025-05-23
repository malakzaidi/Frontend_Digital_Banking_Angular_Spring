import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerDTO, BankAccountDTO } from '../banking-dtos';
import { BankingService } from '../services/banking.service';
import { HttpErrorResponse } from '@angular/common/http';

interface AccountForm {
  type: 'current' | 'saving';
  initialBalance: number;
  overDraft: number | null;
  interestRate: number | null;
  customerId: number | null;
}

@Component({
  selector: 'app-bank-account-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, CommonModule],
  template: `
    <h2>Add Bank Account</h2>
    <div *ngIf="error" class="error">{{ error }}</div>
    <form (ngSubmit)="saveAccount()">
      <mat-form-field>
        <mat-label>Account Type</mat-label>
        <mat-select [(ngModel)]="account.type" name="type" required>
          <mat-option value="current">Current Account</mat-option>
          <mat-option value="saving">Saving Account</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Initial Balance</mat-label>
        <input matInput type="number" [(ngModel)]="account.initialBalance" name="initialBalance" min="0" required>
      </mat-form-field>
      <mat-form-field *ngIf="account.type === 'current'">
        <mat-label>Overdraft Limit</mat-label>
        <input matInput type="number" [(ngModel)]="account.overDraft" name="overDraft" min="0" required>
      </mat-form-field>
      <mat-form-field *ngIf="account.type === 'saving'">
        <mat-label>Interest Rate (%)</mat-label>
        <input matInput type="number" [(ngModel)]="account.interestRate" name="interestRate" min="0" step="0.01" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Customer</mat-label>
        <mat-select [(ngModel)]="account.customerId" name="customerId" required>
          <mat-option *ngFor="let customer of customers" [value]="customer.id">
            {{ customer.name }} (ID: {{ customer.id }})
          </mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="!isFormValid()">Save</button>
      <button mat-raised-button color="accent" type="button" (click)="cancel()">Cancel</button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 20px; max-width: 400px; }
    button { margin-right: 10px; }
    .error { color: red; margin-bottom: 10px; }
  `]
})
export class BankAccountFormComponent implements OnInit {
  account: AccountForm = {
    type: 'current',
    initialBalance: 0,
    overDraft: null,
    interestRate: null,
    customerId: null
  };
  error: string | null = null;
  customers: CustomerDTO[] = [];

  constructor(
    private bankingService: BankingService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('BankAccountFormComponent: ngOnInit');
    this.loadCustomers();
  }

  loadCustomers() {
    this.bankingService.getCustomers().subscribe({
      next: (customers: CustomerDTO[]) => {
        this.customers = customers;
        console.log('Loaded customers:', customers);
        if (customers.length > 0 && customers[0].id !== undefined) {
          this.account.customerId = customers[0].id;
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load customers:', err);
        this.error = `Failed to load customers: ${err.status || 'Unknown'} ${err.statusText || err.message}`;
      }
    });
  }

  isFormValid(): boolean {
    if (!this.account.type || this.account.customerId === null) {
      return false;
    }
    if (this.account.initialBalance < 0) {
      return false;
    }
    if (this.account.type === 'current' && (this.account.overDraft === null || this.account.overDraft < 0)) {
      return false;
    }
    if (this.account.type === 'saving' && (this.account.interestRate === null || this.account.interestRate < 0)) {
      return false;
    }
    return true;
  }

  saveAccount(): void {
    if (!this.isFormValid()) {
      this.bankingService.showError('Please fill all required fields');
      return;
    }

    // Use a common type for the observable to avoid union type issues
    const saveObservable = this.account.type === 'current'
      ? this.bankingService.saveCurrentBankAccount(
        this.account.initialBalance,
        this.account.overDraft!, // Non-null assertion
        this.account.customerId! // Non-null assertion
      )
      : this.bankingService.saveSavingBankAccount(
        this.account.initialBalance,
        this.account.interestRate!, // Non-null assertion
        this.account.customerId! // Non-null assertion
      );

    // Treat the response as BankAccountDTO to unify the type
    // @ts-ignore
    saveObservable.subscribe({
      next: (response: BankAccountDTO) => {
        this.bankingService.showSuccess('Account created successfully');
        this.account = { type: 'current', initialBalance: 0, overDraft: null, interestRate: null, customerId: null };
        this.router.navigate(['/accounts']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to save account:', err);
        this.error = err.message || 'An error occurred';
        this.bankingService.showError(this.error || 'An error occurred');
      }
    });
  }

  cancel() {
    console.log('BankAccountFormComponent: Canceling');
    this.router.navigate(['/accounts']);
  }
}
