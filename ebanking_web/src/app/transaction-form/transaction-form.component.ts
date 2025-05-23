import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService } from '../services/banking.service';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="transaction">
      <h2>Perform Transaction</h2>
      <form (ngSubmit)="performTransaction()">
        <div class="form-group">
          <label for="account">Select Account</label>
          <select id="account" [(ngModel)]="transactionData.accountId" name="accountId" required>
            <option value="" disabled>Select an account</option>
            <option *ngFor="let account of accounts" [value]="account.id">{{ account.id }} - {{ account.type }} ({{ account.balance | currency }})</option>
          </select>
        </div>
        <div class="form-group">
          <label for="type">Transaction Type</label>
          <select id="type" [(ngModel)]="transactionData.type" name="type" required>
            <option value="" disabled>Select transaction type</option>
            <option value="CREDIT">Credit</option>
            <option value="DEBIT">Debit</option>
          </select>
        </div>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input id="amount" type="number" [(ngModel)]="transactionData.amount" name="amount" placeholder="Enter amount" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input id="description" type="text" [(ngModel)]="transactionData.description" name="description" placeholder="e.g., Salary deposit" required>
        </div>
        <button type="submit">Perform Transaction</button>
        <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  `,
  styles: [`
    .transaction {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #FFFFFF;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      font-size: 2.2rem;
      font-weight: 400;
      text-align: center;
      color: #00695C;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #333333;
      font-family: 'Roboto', sans-serif;
    }
    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1rem;
      font-family: 'Roboto', sans-serif;
    }
    input:focus, select:focus {
      border-color: #00695C;
      outline: none;
    }
    button {
      width: 100%;
      padding: 10px;
      background-color: #FF6F61;
      color: #FFFFFF;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-family: 'Roboto', sans-serif;
      cursor: pointer;
    }
    button:hover {
      background-color: #E65A50;
    }
    .success {
      color: #00695C;
      text-align: center;
      margin-top: 10px;
    }
    .error {
      color: #d32f2f;
      text-align: center;
      margin-top: 10px;
    }
  `]
})
export class TransactionComponent implements OnInit {
  transactionData = { accountId: '', type: '', amount: 0, description: '' };
  accounts: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
    if (this.accounts.length === 0) {
      this.errorMessage = 'No accounts found. Please create an account first.';
    }
  }

  performTransaction() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.transactionData.accountId || !this.transactionData.type || this.transactionData.amount <= 0 || !this.transactionData.description) {
      this.errorMessage = 'Please fill in all fields with valid data.';
      return;
    }

    const selectedAccount = this.accounts.find(account => account.id === this.transactionData.accountId);
    if (!selectedAccount) {
      this.errorMessage = 'Selected account not found.';
      return;
    }

    if (this.transactionData.type === 'DEBIT' && selectedAccount.balance < this.transactionData.amount) {
      this.errorMessage = 'Insufficient balance for this transaction.';
      return;
    }

    // Update balance based on transaction type
    if (this.transactionData.type === 'CREDIT') {
      selectedAccount.balance += this.transactionData.amount;
    } else {
      selectedAccount.balance -= this.transactionData.amount;
    }

    localStorage.setItem('userAccounts', JSON.stringify(this.accounts));
    this.successMessage = `${this.transactionData.type} transaction completed successfully!`;
    this.bankingService.showSuccess(this.successMessage);
    this.transactionData = { accountId: '', type: '', amount: 0, description: '' };
  }
}
