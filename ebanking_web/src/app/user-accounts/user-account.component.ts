import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BankingService } from '../services/banking.service';
import { AuthService } from '../services/auth.service';
import { BankAccountDTO } from '../banking-dtos';

@Component({
  selector: 'app-user-accounts',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
  template: `
    <div class="container">
      <h2>My Accounts</h2>
      <div class="table-container mat-elevation-z8">
        <table mat-table [dataSource]="accounts" *ngIf="accounts.length > 0; else noAccounts">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>Account ID</th>
            <td mat-cell *matCellDef="let account">{{ account.id }}</td>
          </ng-container>
          <ng-container matColumnDef="balance">
            <th mat-header-cell *matHeaderCellDef>Balance</th>
            <td mat-cell *matCellDef="let account">{{ account.balance | currency }}</td>
          </ng-container>
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let account">{{ account.type }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
        <ng-template #noAccounts>
          <div class="no-results">
            No accounts found. Please contact support to create an account.
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .table-container {
      overflow-x: auto;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
    }
    .no-results {
      text-align: center;
      margin: 20px 0;
      font-style: italic;
      color: #666;
    }
  `]
})
export class UserAccountsComponent implements OnInit {
  accounts: BankAccountDTO[] = [];
  displayedColumns: string[] = ['id', 'balance', 'type'];

  constructor(
    private bankingService: BankingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.bankingService.getUserAccounts().subscribe({
      next: (accounts: BankAccountDTO[]) => {
        this.accounts = accounts;
        console.log('User accounts:', accounts);
      },
      error: (err) => {
        console.error('Failed to load user accounts:', err);
        this.bankingService.showError('Failed to load accounts: ' + (err.message || 'Unknown error'));
      }
    });
  }
}
