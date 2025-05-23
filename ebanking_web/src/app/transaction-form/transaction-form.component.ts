import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { BankingService } from '../services/banking.service';
import { CreditDTO, DebitDTO } from '../banking-dtos';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  template: `
    <div class="container">
      <h2>Transaction</h2>
      <form (ngSubmit)="performTransaction()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Account ID</mat-label>
          <input matInput [(ngModel)]="transaction.accountId" name="accountId" required>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Type</mat-label>
          <mat-select [(ngModel)]="transaction.type" name="type" required>
            <mat-option value="Credit">Credit</mat-option>
            <mat-option value="Debit">Debit</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Amount</mat-label>
          <input matInput [(ngModel)]="transaction.amount" name="amount" type="number" required>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Description</mat-label>
          <input matInput [(ngModel)]="transaction.description" name="description" required>
        </mat-form-field>
        <div class="button-container">
          <button mat-raised-button color="primary" type="submit" [disabled]="!transaction.accountId || !transaction.type || !transaction.amount || !transaction.description">
            Submit
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
export class TransactionFormComponent {
  transaction: { accountId: string, type: string, amount: number, description: string } = {
    accountId: '',
    type: '',
    amount: 0,
    description: ''
  };

  constructor(
    private bankingService: BankingService,
    private router: Router
  ) {}

  performTransaction() {
    if (this.transaction.type === 'Credit') {
      const credit: CreditDTO = {
        accountId: this.transaction.accountId,
        amount: this.transaction.amount,
        description: this.transaction.description,
        userId: this.getUserId() // Add userId from BankingService
      };
      this.bankingService.credit(credit).subscribe({
        next: () => {
          this.bankingService.showSuccess('Credit transaction successful');
          this.router.navigate(['/accounts']);
        },
        error: (err: any) => {
          console.error('Credit error:', err);
          this.bankingService.showError('Failed to perform credit transaction');
        }
      });
    } else {
      const debit: DebitDTO = {
        accountId: this.transaction.accountId,
        amount: this.transaction.amount,
        description: this.transaction.description,
        userId: this.getUserId() // Add userId for Debit as well (though not required by DebitDTO)
      };
      this.bankingService.debit(debit).subscribe({
        next: () => {
          this.bankingService.showSuccess('Debit transaction successful');
          this.router.navigate(['/accounts']);
        },
        error: (err: any) => {
          console.error('Debit error:', err);
          this.bankingService.showError('Failed to perform debit transaction');
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/accounts']);
  }

  // Helper method to get userId (assuming BankingService has a public method or private access)
  private getUserId(): string {
    return (this.bankingService as any)['getUserId']() || ''; // Access private method; consider making it public
  }
}
