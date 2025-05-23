import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService } from '../services/banking.service';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';

@Component({
  selector: 'app-bill-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="bill-payment">
      <h2>Pay Your Bills</h2>
      <form (ngSubmit)="payBill()">
        <div class="form-group">
          <label for="account">Select Account</label>
          <select id="account" [(ngModel)]="billData.accountId" name="accountId" required>
            <option value="" disabled>Select an account</option>
            <option *ngFor="let account of accounts" [value]="account.id">{{ account.id }} - {{ account.type }} ({{ account.balance | currency }})</option>
          </select>
        </div>
        <div class="form-group">
          <label for="biller">Biller Name</label>
          <input id="biller" type="text" [(ngModel)]="billData.billerName" name="billerName" placeholder="e.g., Electricity Company" required>
        </div>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input id="amount" type="number" [(ngModel)]="billData.amount" name="amount" placeholder="Enter amount" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input id="description" type="text" [(ngModel)]="billData.description" name="description" placeholder="e.g., Monthly electricity bill" required>
        </div>
        <button type="submit">Pay Bill</button>
        <button type="button" class="back-btn" [routerLink]="['/dashboard']">Back to My Dashboard</button>
        <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  `,
  styles: [`
    .bill-payment {
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
      margin-bottom: 10px;
    }
    button:hover {
      background-color: #E65A50;
    }
    .back-btn {
      background-color: #3498db;
    }
    .back-btn:hover {
      background-color: #2980b9;
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
export class BillPaymentComponent {
  billData = { accountId: '', billerName: '', amount: 0, description: '' };
  accounts: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(
    private bankingService: BankingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAccounts();
    }
  }

  loadAccounts() {
    this.accounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
    if (this.accounts.length === 0) {
      this.errorMessage = 'No accounts found. Please create an account first.';
    }
  }

  payBill() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.billData.accountId || !this.billData.billerName || this.billData.amount <= 0 || !this.billData.description) {
      this.errorMessage = 'Please fill in all fields with valid data.';
      return;
    }

    const selectedAccount = this.accounts.find(account => account.id === this.billData.accountId);
    if (!selectedAccount) {
      this.errorMessage = 'Selected account not found.';
      return;
    }

    if (selectedAccount.balance < this.billData.amount) {
      this.errorMessage = 'Insufficient balance to pay this bill.';
      return;
    }

    selectedAccount.balance -= this.billData.amount;
    localStorage.setItem('userAccounts', JSON.stringify(this.accounts));

    this.successMessage = 'Bill paid successfully!';
    this.bankingService.showSuccess(this.successMessage);
    this.billData = { accountId: '', billerName: '', amount: 0, description: '' };
  }

  private getUserId(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || '';
    }
    return '';
  }
}
