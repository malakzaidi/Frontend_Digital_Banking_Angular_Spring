import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { BankingService, BankAccountDTO } from '../services/banking.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container">
      <div *ngIf="authService.isAuthenticated(); else notAuthenticated">
        <div class="dashboard">
          <h1>Welcome, {{ userName }}!</h1>
          <p class="subtitle">Manage your banking needs with ease.</p>

          <!-- User Info -->
          <div class="card user-info">
            <h2>Your Profile</h2>
            <p><strong>Email:</strong> {{ userEmail }}</p>
            <p><strong>Role:</strong> {{ userRole }}</p>
          </div>

          <!-- Quick Links -->
          <div class="card quick-links">
            <h2>Quick Actions</h2>
            <div class="links">
              <a routerLink="/accounts" class="action-button">View Accounts</a>
              <a routerLink="/transaction" class="action-button">Make a Transaction</a>
              <a routerLink="/transfer" class="action-button">Transfer Funds</a>
              <a *ngIf="isAdmin()" routerLink="/customers" class="action-button">Manage Customers</a>
            </div>
          </div>

          <!-- Account Summary -->
          <div class="card account-summary">
            <h2>Account Summary</h2>
            <div *ngIf="accounts.length > 0; else noAccounts">
              <table class="account-table">
                <thead>
                  <tr>
                    <th>Account ID</th>
                    <th>Type</th>
                    <th>Balance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let account of accounts">
                    <td>{{ account.id }}</td>
                    <td>{{ account.type }}</td>
                    <td>{{ account.balance | currency }}</td>
                    <td>
                      <a routerLink="/accounts/history/{{ account.id }}" class="action-link">Details</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ng-template #noAccounts>
              <p>No accounts found. Create one to get started!</p>
              <a routerLink="/accounts/new" class="action-button">Create Account</a>
            </ng-template>
          </div>
        </div>
      </div>
      <ng-template #notAuthenticated>
        <div class="login-message">
          <h2>Please Log In</h2>
          <p>You need to be authenticated to access this application.</p>
          <a routerLink="/login">Go to Login</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 40px 0;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 10px;
      font-weight: 400;
    }
    .subtitle {
      font-family: 'Roboto', sans-serif;
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 30px;
    }
    .card {
      background-color: #FFFFFF;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card h2 {
      font-size: 1.8rem;
      margin-bottom: 15px;
      font-weight: 400;
    }
    .user-info p {
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
      margin: 5px 0;
    }
    .quick-links .links {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }
    .action-button {
      font-family: 'Roboto', sans-serif;
      background-color: #FF6F61;
      color: #FFFFFF;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .action-button:hover {
      background-color: #E65A50;
    }
    .account-summary .account-table {
      width: 100%;
      border-collapse: collapse;
    }
    .account-table th, .account-table td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      font-family: 'Roboto', sans-serif;
    }
    .account-table th {
      background-color: #00695C;
      color: #FFFFFF;
    }
    .action-link {
      color: #FF6F61;
      font-weight: 500;
      font-family: 'Roboto', sans-serif;
    }
    .action-link:hover {
      color: #E65A50;
    }
    .login-message {
      text-align: center;
      margin-top: 50px;
    }
    .login-message h2 {
      color: #d32f2f;
    }
    .login-message a {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #FF6F61;
      color: white;
      border-radius: 5px;
      font-family: 'Roboto', sans-serif;
    }
    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }
      .card {
        padding: 15px;
      }
      .card h2 {
        font-size: 1.5rem;
      }
      .quick-links .links {
        flex-direction: column;
        gap: 10px;
      }
      .account-table th, .account-table td {
        font-size: 0.9rem;
        padding: 8px;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userRole: string = '';
  accounts: BankAccountDTO[] = [];

  constructor(
    public authService: AuthService,
    private bankingService: BankingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.authService.isAuthenticated()) {
      this.loadUserInfo();
      this.loadAccounts();
    }
  }

  isAdmin(): boolean {
    const tokenPayload = this.authService.decodeToken();
    return tokenPayload?.roles?.includes('ROLE_ADMIN') || false;
  }

  private loadUserInfo() {
    const tokenPayload = this.authService.decodeToken();
    if (tokenPayload) {
      this.userName = tokenPayload.sub || 'User';
      this.userEmail = tokenPayload.email || 'N/A';
      this.userRole = tokenPayload.roles?.join(', ') || 'N/A';
    }
  }

  private loadAccounts() {
    this.bankingService.getUserAccounts().subscribe({
      next: (accounts: BankAccountDTO[]) => {
        this.accounts = accounts;
      },
      error: (err: any) => {
        console.error('Error loading accounts:', err);
      }
    });
  }
}
