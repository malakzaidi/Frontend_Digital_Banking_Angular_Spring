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
import { BlockchainService } from '../services/blockchain.service';
import { BankAccountDTO, TransferRequestDTO } from '../banking-dtos';

interface TransferForm {
  accountIdSource: string;
  accountIdDestination: string;
  amount: number;
}

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, CommonModule],
  template: `
    <div class="container">
      <h2>Transfer Money</h2>
      <div *ngIf="error" class="error">{{ error }}</div>
      <form (ngSubmit)="submitTransfer()">
        <mat-form-field appearance="outline">
          <mat-label>From Account</mat-label>
          <mat-select [(ngModel)]="form.accountIdSource" name="accountIdSource" required>
            <mat-option *ngFor="let account of accounts" [value]="account.id">
              {{ account.id }} ({{ account.type }} - {{ account.balance | currency }})
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>To Account</mat-label>
          <input matInput [(ngModel)]="form.accountIdDestination" name="accountIdDestination" placeholder="Enter recipient account ID" required>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Amount</mat-label>
          <input matInput type="number" [(ngModel)]="form.amount" name="amount" min="0" step="0.01" required>
        </mat-form-field>
        <button mat-raised-button color="primary" type="submit" [disabled]="!isFormValid()">Transfer</button>
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
export class TransferFormComponent implements OnInit {
  form: TransferForm = {
    accountIdSource: '',
    accountIdDestination: '',
    amount: 0
  };
  accounts: BankAccountDTO[] = [];
  error: string | null = null;
  userId: string = '';

  constructor(
    private bankingService: BankingService,
    private authService: AuthService,
    private blockchainService: BlockchainService,
    private router: Router
  ) {}

  ngOnInit() {
    const tokenPayload = this.authService.decodeToken();
    this.userId = tokenPayload?.sub || '';
    this.loadAccounts();
  }

  loadAccounts() {
    this.bankingService.getUserAccounts().subscribe({
      next: (accounts: BankAccountDTO[]) => {
        this.accounts = accounts;
        if (accounts.length > 0) {
          this.form.accountIdSource = accounts[0].id!;
        }
      },
      error: (err) => {
        this.error = 'Failed to load accounts: ' + (err.message || 'Unknown error');
      }
    });
  }

  isFormValid(): boolean {
    return !!this.form.accountIdSource && !!this.form.accountIdDestination && this.form.amount > 0;
  }

  submitTransfer(): void {
    if (!this.isFormValid()) {
      this.bankingService.showError('Please fill all required fields with valid values');
      return;
    }

    const transfer: TransferRequestDTO = {
      accountIdSource: this.form.accountIdSource,
      accountIdDestination: this.form.accountIdDestination,
      amount: this.form.amount,
      userId: this.userId
    };

    this.bankingService.transfer(transfer).subscribe({
      next: (response: any) => {
        // Log the transfer in the blockchain ledger
        this.blockchainService.addTransaction({
          type: 'transfer',
          from: this.form.accountIdSource,
          to: this.form.accountIdDestination,
          amount: this.form.amount,
          userId: this.userId,
          timestamp: new Date().toISOString()
        });
        this.bankingService.showSuccess('Transfer successful');
        this.router.navigate(['/my-accounts']);
      },
      error: (err) => {
        this.error = 'Failed to process transfer: ' + (err.message || 'Unknown error');
      }
    });
  }

  cancel() {
    this.router.navigate(['/my-accounts']);
  }
}
