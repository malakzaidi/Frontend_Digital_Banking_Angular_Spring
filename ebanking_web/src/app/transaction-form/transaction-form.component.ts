import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankingService } from '../services/banking.service';
import { AuthService } from '../services/auth.service';
import { BankAccountDTO, CreditDTO, DebitDTO } from '../banking-dtos';

interface TransactionForm {
  type: 'credit' | 'debit';
  accountId: string;
  amount: number;
  description: string;
}

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, CommonModule],
  template: `
    <div class="container">
      <h2>New Transaction</h2>
      <div *ngIf="error" class="error">{{ error }}</div>
      <form (ngSubmit)="submitTransaction()">
        <mat-form-field appearance="outline">
          <mat-label>Transaction Type</mat-label>
          <mat-select [(ngModel)]="form.type" name="type" required>
            <mat-option value="credit">Credit</mat-option>
            <mat-option value="debit">Debit</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Account</mat-label>
          <mat-select [(ngModel)]="form.accountId" name="accountId" required>
            <mat-option *ngFor="let account of accounts" [value]="account.id">
              {{ account.id }} ({{ account.type }} - {{ account.balance | currency }})
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Amount</mat-label>
          <input matInput type="number" [(ngModel)]="form.amount" name="amount" min="0" step="0.01" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <input matInput [(ngModel)]="form.description" name="description" required>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="!isFormValid()">Submit</button>
        <button mat-raised-button color="accent" type="button" (click)="cancel()">Cancel</button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
      background: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      text-align: center;
      color: #333;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .error {
      color: red;
      text-align: center;
      margin-bottom: 10px;
    }
    mat-form-field {
      width: 100%;
    }
    button {
      margin-right: 10px;
    }
  `]
})
export class TransactionFormComponent implements OnInit {
  form: TransactionForm = {
    type: 'credit',
    accountId: '',
    amount: 0,
    description: ''
  };
  accounts: BankAccountDTO[] = [];
  error: string | null = null;
  userId: string = '';

  constructor(
    private bankingService: BankingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const tokenPayload = this.authService.decodeToken();
    this.userId = tokenPayload?.sub || ''; // Assuming 'sub' contains the userId
    this.loadAccounts();
  }

  loadAccounts() {
    this.bankingService.getUserAccounts().subscribe({
      next: (accounts: BankAccountDTO[]) => {
        this.accounts = accounts;
        if (accounts.length > 0) {
          this.form.accountId = accounts[0].id!;
        }
      },
      error: (err) => {
        this.error = 'Failed to load accounts: ' + (err.message || 'Unknown error');
      }
    });
  }

  isFormValid(): boolean {
    return !!this.form.type && !!this.form.accountId && this.form.amount > 0 && !!this.form.description;
  }

  submitTransaction(): void {
    if (!this.isFormValid()) {
      this.bankingService.showError('Please fill all required fields with valid values');
      return;
    }

    const transaction: CreditDTO | DebitDTO = {
      accountId: this.form.accountId,
      amount: this.form.amount,
      description: this.form.description,
      userId: this.userId
    };

    const observable = this.form.type === 'credit'
      ? this.bankingService.credit(transaction)
      : this.bankingService.debit(transaction);

    observable.subscribe({
      next: (response: any) => {
        this.bankingService.showSuccess(`${this.form.type.charAt(0).toUpperCase() + this.form.type.slice(1)} transaction successful`);
        this.router.navigate(['/transactions/history']);
      },
      error: (err) => {
        this.error = `Failed to process ${this.form.type} transaction: ` + (err.message || 'Unknown error');
      }
    });
  }

  cancel() {
    this.router.navigate(['/my-accounts']);
  }
}
