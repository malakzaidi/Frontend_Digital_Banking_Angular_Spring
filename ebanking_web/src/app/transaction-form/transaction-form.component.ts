import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {BankingService, CreditDTO, DebitDTO} from '../services/banking.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, CommonModule],
  template: `
    <h2>Transaction</h2>
    <form (ngSubmit)="submitTransaction()">
      <mat-form-field>
        <mat-label>Account ID</mat-label>
        <input matInput [(ngModel)]="transaction.accountId" name="accountId" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Type</mat-label>
        <mat-select [(ngModel)]="transaction.type" name="type" required>
          <mat-option value="credit">Credit</mat-option>
          <mat-option value="debit">Debit</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Amount</mat-label>
        <input matInput [(ngModel)]="transaction.amount" name="amount" type="number" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <input matInput [(ngModel)]="transaction.description" name="description" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="!transaction.accountId || !transaction.type || !transaction.amount || !transaction.description">Submit</button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 20px; max-width: 400px; }
  `]
})
export class TransactionFormComponent {
  transaction: { accountId: string; type: string; amount: number; description: string } = {
    accountId: '',
    type: '',
    amount: 0,
    description: ''
  };

  constructor(private bankingService: BankingService) {}

  submitTransaction() {
    if (this.transaction.type === 'credit') {
      const credit: CreditDTO = {
        accountId: this.transaction.accountId,
        amount: this.transaction.amount,
        description: this.transaction.description
      };
      this.bankingService.credit(credit).subscribe(() => {
        this.resetForm();
      });
    } else if (this.transaction.type === 'debit') {
      const debit: DebitDTO = {
        accountId: this.transaction.accountId,
        amount: this.transaction.amount,
        description: this.transaction.description
      };
      this.bankingService.debit(debit).subscribe(() => {
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.transaction = { accountId: '', type: '', amount: 0, description: '' };
  }
}
