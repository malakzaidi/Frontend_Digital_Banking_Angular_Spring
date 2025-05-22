import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService } from '../services/banking.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bill-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
        <button type="submit">Pay Bill</button>
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
export class BillPaymentComponent {
  billData = { accountId: '', billerName: '', amount: 0 };
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
    this.bankingService.getUserAccounts().subscribe({
      next: (accounts: any[]) => {
        this.accounts = accounts;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load accounts';
      }
    });
  }

  payBill() {
    this.successMessage = '';
    this.errorMessage = '';
    const body = {
      accountId: this.billData.accountId,
      billerName: this.billData.billerName,
      amount: this.billData.amount,
      userId: this.getUserId()
    };
    this.bankingService.payBill(body).subscribe({
      next: () => {
        this.successMessage = 'Bill paid successfully';
        this.billData = { accountId: '', billerName: '', amount: 0 };
      },
      error: (err: any) => {
        this.errorMessage = err.error?.message || 'Failed to pay bill';
      }
    });
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
