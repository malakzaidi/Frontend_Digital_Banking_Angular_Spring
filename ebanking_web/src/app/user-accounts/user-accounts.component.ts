import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BankingService } from '../services/banking.service';
import { BankAccountDTO } from '../banking-dtos';

@Component({
  selector: 'app-user-accounts',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatListModule, CommonModule, CurrencyPipe],
  template: `
    <div class="container">
      <mat-card class="dashboard-card">
        <mat-card-header>
          <mat-card-title>My Accounts Dashboard</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item *ngFor="let account of accounts">
              <div matLine>Account ID: {{ account.id }} - Balance: {{ account.balance | currency:'USD' }}</div>
              <button mat-button (click)="viewAccount(account.id)">View Details</button>
            </mat-list-item>
            <mat-list-item>
              <button mat-button (click)="addAccount()">Add New Account</button>
            </mat-list-item>
          </mat-list>
          <div class="actions">
            <button mat-raised-button color="primary" (click)="transfer()">Transfer</button>
            <button mat-raised-button color="accent" (click)="transactions()">Transactions</button>
            <button mat-raised-button color="warn" (click)="payBills()">Pay Bills</button>
            <button mat-raised-button color="primary" (click)="checkBalance()">Check Balance</button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      background: #f5f5f5;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .dashboard-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }
    mat-card-title {
      font-size: 24px;
      font-weight: 500;
      color: #333;
    }
    mat-list-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    button {
      width: 100%;
      margin: 5px 0;
    }
  `]
})
export class UserAccountsComponent implements OnInit {
  accounts: BankAccountDTO[] = [];

  constructor(
    private bankingService: BankingService,
    private router: Router,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.bankingService.getUserAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        this.bankingService.showError('Failed to load accounts: ' + err.message);
      }
    });
  }

  viewAccount(accountId: string | undefined) {
    if (accountId) {
      this.router.navigate([`/my-accounts/view/${accountId}`]);
    } else {
      this.bankingService.showError('Invalid account ID');
    }
  }

  addAccount() {
    this.router.navigate(['/my-accounts/new']);
  }

  transfer() {
    this.router.navigate(['/transfer']);
  }

  transactions() {
    this.router.navigate(['/transactions/history']);
  }

  payBills() {
    this.router.navigate(['/bill-payment']);
  }

  checkBalance() {
    if (this.accounts.length > 0) {
      const totalBalance = this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
      const formattedBalance = this.currencyPipe.transform(totalBalance, 'USD', 'symbol', '1.2-2') || '0.00';
      this.bankingService.showSuccess(`Total Balance: ${formattedBalance}`);
    } else {
      this.bankingService.showError('No accounts available to check balance');
    }
  }
}
