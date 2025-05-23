import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {CustomerDTO} from '../banking-dtos';
import {BankingService} from '../services/banking.service';


interface AccountForm {
  type: 'current' | 'saving';
  initialBalance: number;
  overDraft?: number;
  interestRate?: number;
  customerId: number;
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
    overDraft: 0,
    interestRate: 0,
    customerId: 0
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
        // Set default customer if we have any
        if (customers.length > 0) {
          // @ts-ignore
          this.account.customerId = customers[0].id;
        }
      },
      error: (err: any) => {
        console.error('Failed to load customers:', err);
        this.error = `Failed to load customers: ${err.status || 'Unknown'} ${err.statusText || err.message}`;
      }
    });
  }

  isFormValid(): boolean {
    if (!this.account.type || !this.account.customerId) {
      return false;
    }
    if (this.account.initialBalance < 0) {
      return false;
    }
    if (this.account.type === 'current' && (this.account.overDraft == null || this.account.overDraft < 0)) {
      return false;
    }
    if (this.account.type === 'saving' && (this.account.interestRate == null || this.account.interestRate < 0)) {
      return false;
    }
    return true;
  }

  saveAccount() {
    console.log('BankAccountFormComponent: Saving account:', this.account);
    if (!this.isFormValid()) {
      console.warn('BankAccountFormComponent: Validation failed');
      this.bankingService.showError('Please fill all required fields correctly');
      return;
    }

    // Ensure the values are numbers and not undefined
    const overDraft = this.account.type === 'current' ?
      (this.account.overDraft || 0) : 0;

    const interestRate = this.account.type === 'saving' ?
      (this.account.interestRate || 0) : 0;

    const customerId = this.account.customerId || 0;

    const observable = this.account.type === 'current'
      ? this.bankingService.saveCurrentBankAccount(this.account.initialBalance, overDraft, customerId)
      : this.bankingService.saveSavingBankAccount(this.account.initialBalance, interestRate, customerId);

    // @ts-ignore
    observable.subscribe({
      next: (response: any) => {
        console.log('BankAccountFormComponent: Account saved:', response);
        this.router.navigate(['/accounts']);
      },
      error: (err: { status: any; statusText: any; message: any; }) => {
        console.error('BankAccountFormComponent: Save error:', err);
        this.error = `Failed to save account: ${err.status || 'Unknown'} ${err.statusText || err.message}`;
        this.bankingService.showError(this.error);
      }
    });
  }

  cancel() {
    console.log('BankAccountFormComponent: Canceling');
    this.router.navigate(['/accounts']);
  }
}
