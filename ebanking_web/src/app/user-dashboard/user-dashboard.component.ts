import { Component, OnInit } from '@angular/core';
import { BankingService } from '../services/banking.service';
import { AccountOperationDTO } from '../banking-dtos';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule, RouterModule],
  template: `
    <div class="container">
      <h1 class="dashboard-title">My Dashboard</h1>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="action-btn" [routerLink]="['/account-creation']">Create New Account</button>
        <button class="action-btn" [routerLink]="['/transactions/new']">Perform Transaction</button>
        <button class="action-btn" [routerLink]="['/transfer']">Transfer Funds</button>
        <button class="action-btn" [routerLink]="['/bill-payment']">Pay Bills</button>
      </div>

      <!-- Account Summary -->
      <div class="account-summary">
        <div class="account-card" *ngFor="let account of userAccounts">
          <h3>{{ account.id }} - {{ account.type }}</h3>
          <p class="balance">Balance: {{ account.balance | currency }}</p>
          <a class="history-link" [routerLink]="['/my-accounts/view', account.id]">View History</a>
        </div>
      </div>

      <!-- Recent Transactions -->
      <h2 class="section-title">Recent Transactions</h2>
      <table mat-table [dataSource]="recentTransactions" class="transaction-table">
        <ng-container matColumnDef="operationDate">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let element">{{ element.operationDate | date }}</td>
        </ng-container>
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let element">{{ element.type }}</td>
        </ng-container>
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Amount</th>
          <td mat-cell *matCellDef="let element">{{ element.amount | currency }}</td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 20]"
                     [pageSize]="pageSize"
                     [pageIndex]="currentPage"
                     [length]="totalTransactions"
                     (page)="onPageChange($event)"
                     showFirstLastButtons>
      </mat-paginator>
    </div>
  `,
  styles: [`
    .container {
      padding: 40px;
      max-width: 1200px;
      margin: 0 auto;
      background: #f5f7fa;
      min-height: 100vh;
      font-family: 'Poppins', sans-serif;
    }
    .dashboard-title {
      font-size: 2.5rem;
      color: #2c3e50;
      text-align: center;
      margin-bottom: 20px;
    }
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 30px;
    }
    .action-btn {
      padding: 12px 25px;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.3s;
    }
    .action-btn:hover {
      background: #c0392b;
    }
    .account-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .account-card {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .account-card h3 {
      font-size: 1.2rem;
      color: #34495e;
      margin-bottom: 10px;
    }
    .balance {
      font-size: 1.5rem;
      color: #27ae60;
      margin-bottom: 10px;
    }
    .history-link {
      color: #3498db;
      text-decoration: none;
      font-size: 0.9rem;
    }
    .history-link:hover {
      text-decoration: underline;
    }
    .section-title {
      font-size: 1.8rem;
      color: #2c3e50;
      margin-bottom: 15px;
    }
    .transaction-table {
      width: 100%;
      margin-bottom: 20px;
      background: white;
      border-radius: 8px;
      overflow: hidden;
    }
    .transaction-table th {
      background: #34495e;
      color: white;
      padding: 12px;
    }
    .transaction-table td {
      padding: 12px;
      border-bottom: 1px solid #ecf0f1;
    }
    .mat-paginator {
      background: white;
      border-radius: 8px;
      padding: 10px;
    }
  `]
})
export class UserDashboardComponent implements OnInit {
  dashboard: any = null;
  userAccounts: any[] = [];
  recentTransactions: AccountOperationDTO[] = [];
  displayedColumns: string[] = ['operationDate', 'type', 'amount', 'description'];
  currentPage = 0;
  pageSize = 5;
  totalTransactions = 0;
  error: string | null = null;

  constructor(
    private bankingService: BankingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.loadUserAccounts();
      this.loadDashboardData();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadUserAccounts() {
    const allAccounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
    const userId = this.getUserId();
    this.userAccounts = allAccounts.filter((account: any) => account.userId === userId);
  }

  loadDashboardData() {
    this.bankingService.getDashboardData(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.error = null;
        this.dashboard = response;
        this.recentTransactions = response.recentTransactions || [];
        this.currentPage = response.currentPage || 0;
        this.pageSize = response.pageSize || 5;
        this.totalTransactions = response.totalTransactions || 0;
      },
      error: (err: HttpErrorResponse) => {
        console.warn('Dashboard data load failed, using local data:', err);
        this.error = null; // Remove error message
        this.recentTransactions = []; // Fallback to empty transactions
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDashboardData();
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
