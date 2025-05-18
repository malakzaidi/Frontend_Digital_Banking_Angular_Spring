import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {BankAccountDTO, BankingService} from '../services/banking.service';

@Component({
  selector: 'app-bank-account-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, CommonModule],
  template: `
    <h2>Bank Accounts</h2>
    <table mat-table [dataSource]="accounts" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let account">{{ account.id }}</td>
      </ng-container>
      <ng-container matColumnDef="balance">
        <th mat-header-cell *matHeaderCellDef>Balance</th>
        <td mat-cell *matCellDef="let account">{{ account.balance | currency }}</td>
      </ng-container>
      <ng-container matColumnDef="customerId">
        <th mat-header-cell *matHeaderCellDef>Customer ID</th>
        <td mat-cell *matCellDef="let account">{{ account.customerId }}</td>
      </ng-container>
      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef>Type</th>
        <td mat-cell *matCellDef="let account">{{ account.type }}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let account">
          <button mat-raised-button color="primary" [routerLink]="['/accounts/history', account.id]">History</button>
          <button mat-raised-button color="warn" (click)="deleteAccount(account.id)">Delete</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <button mat-raised-button color="primary" routerLink="/accounts/new">Add Account</button>
  `,
  styles: [`
    table { width: 100%; margin-bottom: 20px; }
    button { margin-right: 10px; }
  `]
})
export class BankAccountListComponent implements OnInit {
  accounts: BankAccountDTO[] = [];
  displayedColumns: string[] = ['id', 'balance', 'customerId', 'type', 'actions'];

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.bankingService.getBankAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  deleteAccount(accountId: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.bankingService.deleteBankAccount(accountId).subscribe(() => {
        this.bankingService.getBankAccounts().subscribe(accounts => {
          this.accounts = accounts;
        });
      });
    }
  }
}
