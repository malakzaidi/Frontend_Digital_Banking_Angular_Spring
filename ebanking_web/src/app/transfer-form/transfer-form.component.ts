import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService } from '../services/banking.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="transfer">
      <h2>Transfer Funds</h2>
      <form (ngSubmit)="performTransfer()">
        <div class="form-group">
          <label for="fromAccount">From Account</label>
          <select id="fromAccount" [(ngModel)]="transferData.fromAccountId" name="fromAccountId" required>
            <option value="" disabled>Select source account</option>
            <option *ngFor="let account of accounts" [value]="account.id">{{ account.id }} - {{ account.type }} ({{ account.balance | currency }})</option>
          </select>
        </div>
        <div class="form-group">
          <label for="toAccount">To Account</label>
          <select id="toAccount" [(ngModel)]="transferData.toAccountId" name="toAccountId" required>
            <option value="" disabled>Select destination account</option>
            <option *ngFor="let account of accounts" [value]="account.id">{{ account.id }} - {{ account.type }} ({{ account.balance | currency }})</option>
          </select>
        </div>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input id="amount" type="number" [(ngModel)]="transferData.amount" name="amount" placeholder="Enter amount" required>
        </div>
        <button type="submit">Transfer</button>
        <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  `,
  styles: [`
    .transfer {
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
export class TransferComponent implements OnInit {
  transferData = { fromAccountId: '', toAccountId: '', amount: 0 };
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

  performTransfer() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.transferData.fromAccountId || !this.transferData.toAccountId || this.transferData.amount <= 0) {
      this.errorMessage = 'Please fill in all fields with valid data.';
      return;
    }

    if (this.transferData.fromAccountId === this.transferData.toAccountId) {
      this.errorMessage = 'Source and destination accounts must be different.';
      return;
    }

    const fromAccount = this.accounts.find(account => account.id === this.transferData.fromAccountId);
    const toAccount = this.accounts.find(account => account.id === this.transferData.toAccountId);

    if (!fromAccount || !toAccount) {
      this.errorMessage = 'One or both accounts not found.';
      return;
    }

    if (fromAccount.balance < this.transferData.amount) {
      this.errorMessage = 'Insufficient balance in the source account.';
      return;
    }

    // Perform the transfer
    fromAccount.balance -= this.transferData.amount;
    toAccount.balance += this.transferData.amount;

    localStorage.setItem('userAccounts', JSON.stringify(this.accounts));
    this.successMessage = 'Transfer completed successfully!';
    this.bankingService.showSuccess(this.successMessage);
    this.transferData = { fromAccountId: '', toAccountId: '', amount: 0 };
  }
}
