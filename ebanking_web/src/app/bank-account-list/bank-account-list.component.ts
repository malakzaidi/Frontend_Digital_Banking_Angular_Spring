import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BankAccountDTO, BankingService, CustomerDTO } from '../services/banking.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-bank-account-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <h2>Bank Accounts</h2>

      <div class="search-container">
        <mat-form-field appearance="outline" class="full-width search-field">
          <mat-label>Search Accounts</mat-label>
          <input matInput [(ngModel)]="searchKeyword" (input)="onSearchChange($event)" placeholder="Search by ID, customer ID or name">
          <mat-icon matPrefix>search</mat-icon>
          <button *ngIf="searchKeyword" matSuffix mat-icon-button aria-label="Clear" (click)="clearSearch()">
            <mat-icon>close</mat-icon>
          </button>
        </mat-form-field>
      </div>

      <div class="table-container mat-elevation-z8">
        <table mat-table [dataSource]="accounts">
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
          <ng-container matColumnDef="customerName">
            <th mat-header-cell *matHeaderCellDef>Customer Name</th>
            <td mat-cell *matCellDef="let account">{{ getCustomerName(account.customerId) }}</td>
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
      </div>

      <div *ngIf="accounts.length === 0" class="no-results">
        No accounts found. Try a different search term.
      </div>

      <div class="button-container">
        <button mat-raised-button color="primary" routerLink="/accounts/new">Add Account</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .table-container {
      overflow-x: auto;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
    }
    button {
      margin-right: 10px;
    }
    .search-container {
      width: 100%;
      margin-bottom: 20px;
    }
    .full-width {
      width: 100%;
    }
    .search-field {
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .search-field .mat-form-field-flex {
      background-color: white;
      border: 1px solid #ddd;
    }
    .no-results {
      text-align: center;
      margin: 20px 0;
      font-style: italic;
      color: #666;
    }
    .button-container {
      margin-top: 20px;
    }
  `]
})
export class BankAccountListComponent implements OnInit {
  accounts: BankAccountDTO[] = [];
  customers: CustomerDTO[] = [];
  displayedColumns: string[] = ['id', 'balance', 'customerId', 'customerName', 'type', 'actions'];
  searchKeyword: string = '';
  private searchSubject = new Subject<string>();

  constructor(
    private bankingService: BankingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Set up debounce for search to avoid too many API calls
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(keyword => {
      this.searchAccounts(keyword);
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadAllAccounts();
      this.loadAllCustomers();
    } else {
      console.log('Skipping bank accounts fetch on server-side');
    }
  }

  loadAllAccounts() {
    this.bankingService.getBankAccounts().subscribe({
      next: accounts => {
        this.accounts = accounts;
        console.log('Loaded accounts:', accounts);
      },
      error: err => {
        console.error('Load accounts error:', err);
        this.bankingService.showError(`Failed to load accounts: ${err.status} ${err.statusText}`);
      }
    });
  }

  loadAllCustomers() {
    this.bankingService.getCustomers().subscribe({
      next: customers => {
        this.customers = customers;
        console.log('Loaded customers for name display:', customers);
      },
      error: err => {
        console.error('Load customers error:', err);
      }
    });
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? customer.name : `Customer #${customerId}`;
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  clearSearch() {
    this.searchKeyword = '';
    this.loadAllAccounts();
  }

  searchAccounts(keyword: string) {
    if (!keyword || keyword.trim() === '') {
      this.loadAllAccounts();
      return;
    }

    console.log('Searching accounts with keyword:', keyword);
    this.bankingService.searchBankAccounts(keyword).subscribe({
      next: accounts => {
        this.accounts = accounts;
        console.log('Search results:', accounts);
      },
      error: err => {
        console.error('Search accounts error:', err);
        this.bankingService.showError(`Failed to search accounts: ${err.status} ${err.statusText}`);
      }
    });
  }

  deleteAccount(accountId: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      console.log('Deleting account:', accountId);
      this.bankingService.deleteBankAccount(accountId).subscribe({
        next: () => {
          console.log('Account deleted:', accountId);
          if (this.searchKeyword && this.searchKeyword.trim() !== '') {
            this.searchAccounts(this.searchKeyword);
          } else {
            this.loadAllAccounts();
          }
        },
        error: err => {
          console.error('Delete account error:', err);
          this.bankingService.showError(`Failed to delete account: ${err.status} ${err.statusText}`);
        }
      });
    }
  }
}
