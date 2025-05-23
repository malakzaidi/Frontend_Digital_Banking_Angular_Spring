import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankingService } from '../services/banking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="account-creation">
      <h2>Create New Account</h2>
      <form (ngSubmit)="createAccount()">
        <div class="form-group">
          <label for="accountType">Account Type</label>
          <select id="accountType" [(ngModel)]="accountData.type" name="accountType" required>
            <option value="" disabled>Select account type</option>
            <option value="Current">Current</option>
            <option value="Saving">Saving</option>
          </select>
        </div>
        <div class="form-group">
          <label for="initialBalance">Initial Balance</label>
          <input id="initialBalance" type="number" [(ngModel)]="accountData.balance" name="initialBalance" placeholder="Enter initial balance" required>
        </div>
        <button type="submit" class="create-btn">Create Account</button>
        <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  `,
  styles: [`
    .account-creation {
      max-width: 500px;
      margin: 50px auto;
      padding: 30px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
    h2 {
      font-size: 2rem;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 20px;
    }
    .form-group {
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-size: 1rem;
      color: #34495e;
      margin-bottom: 8px;
    }
    input, select {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    input:focus, select:focus {
      border-color: #3498db;
      outline: none;
    }
    .create-btn {
      width: 100%;
      padding: 12px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    .create-btn:hover {
      background: #c0392b;
    }
    .success {
      color: #27ae60;
      text-align: center;
      margin-top: 15px;
    }
    .error {
      color: #e74c3c;
      text-align: center;
      margin-top: 15px;
    }
  `]
})
export class AccountCreationComponent {
  accountData = { type: '', balance: 0 };
  successMessage = '';
  errorMessage = '';

  constructor(private bankingService: BankingService, private router: Router) {}

  createAccount() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.accountData.type || this.accountData.balance < 0) {
      this.errorMessage = 'Please select an account type and enter a valid initial balance.';
      return;
    }

    const accountId = `ACC${Date.now()}`;
    const userId = this.getUserId();
    const newAccount = {
      id: accountId,
      type: this.accountData.type,
      balance: this.accountData.balance,
      userId: userId
    };

    const existingAccounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
    existingAccounts.push(newAccount);
    localStorage.setItem('userAccounts', JSON.stringify(existingAccounts));

    this.successMessage = `Account created successfully! Account ID: ${accountId}`;
    this.bankingService.showSuccess(this.successMessage);

    this.accountData = { type: '', balance: 0 };

    setTimeout(() => {
      this.router.navigate(['/user-dashboard']);
    }, 2000);
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
