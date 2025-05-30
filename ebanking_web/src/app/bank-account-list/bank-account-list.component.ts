import { Component, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BankAccountDTO, CustomerDTO } from '../banking-dtos';
import { BankingService } from '../services/banking.service';

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
    MatIconModule,
    MatPaginatorModule
  ],
  template: `
    <div class="container">
      <ng-container *ngIf="isAdmin; else unauthorized">
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
          <table mat-table [dataSource]="accounts" *ngIf="accounts.length > 0 || isLoading">
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
              <td mat-cell *matCellDef="let account">{{ account.customer?.id || 'N/A' }}</td>
            </ng-container>
            <ng-container matColumnDef="customerName">
              <th mat-header-cell *matHeaderCellDef>Customer Name</th>
              <td mat-cell *matCellDef="let account">{{ getCustomerName(account.customer?.id) }}</td>
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

          <mat-paginator
            [length]="totalAccounts"
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 20]"
            (page)="onPageChange($event)"
            *ngIf="accounts.length > 0">
          </mat-paginator>
        </div>

        <div *ngIf="accounts.length === 0 && !isLoading" class="no-results">
          No accounts found. Try a different search term or refresh the page.
        </div>

        <div class="button-container">
          <button mat-raised-button color="primary" routerLink="/accounts/new">Add Account</button>
        </div>
      </ng-container>

      <ng-template #unauthorized>
        <div class="unauthorized-message">
          <h2>Unauthorized Access</h2>
          <p>You do not have permission to manage bank accounts.</p>
          <button mat-raised-button color="primary" routerLink="/login">Back to Login</button>
        </div>
      </ng-template>
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
    .unauthorized-message {
      text-align: center;
      margin-top: 50px;
    }
    .unauthorized-message h2 {
      color: #d32f2f;
    }
    .unauthorized-message p {
      margin: 20px 0;
    }
    mat-paginator {
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
  private customerMap: Map<number, string> = new Map<number, string>();
  isLoading: boolean = true;
  isAdmin: boolean = false;
  totalAccounts: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private bankingService: BankingService,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(keyword => {
      this.searchAccounts(keyword);
    });
  }

  ngOnInit() {
    const tokenPayload = this.authService.decodeToken();
    this.isAdmin = tokenPayload?.roles?.includes('ROLE_ADMIN') || false;

    if (!this.isAdmin) {
      console.warn('Unauthorized access attempt to BankAccountListComponent');
      this.router.navigate(['/unauthorized']);
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      this.loadAllCustomers();
    } else {
      console.log('Skipping bank accounts fetch on server-side');
      this.isLoading = false;
    }
  }

  loadAllCustomers() {
    this.isLoading = true;
    this.bankingService.getCustomers().subscribe({
      next: customers => {
        this.customers = customers;
        console.log('Loaded customers:', customers.map(c => ({ id: c.id, name: c.name })));

        this.customerMap.clear();
        customers.forEach(customer => {
          if (customer.id !== undefined && customer.id !== null) {
            this.customerMap.set(Number(customer.id), customer.name);
          } else {
            console.warn('Customer with undefined or null ID found:', customer);
          }
        });

        this.loadAllAccounts();
      },
      error: err => {
        console.error('Load customers error:', err);
        this.bankingService.showError(`Failed to load customers: ${err.status || 'Unknown error'}`);
        this.loadAllAccounts();
      }
    });
  }

  loadAllAccounts() {
    this.isLoading = true;
    this.bankingService.getBankAccounts(this.pageIndex, this.pageSize).subscribe({
      next: (response: { accounts: BankAccountDTO[], total: number }) => {
        this.accounts = response.accounts || []; // Handle undefined case
        this.totalAccounts = response.total || 0;
        console.log('Loaded accounts:', this.accounts.map(a => ({ id: a.id, customerId: a.customer?.id, type: a.type })));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Load accounts error:', err);
        this.bankingService.showError(`Failed to load accounts: ${err.status} ${err.statusText}`);
        this.accounts = [];
        this.totalAccounts = 0;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    if (this.searchKeyword && this.searchKeyword.trim() !== '') {
      this.searchAccounts(this.searchKeyword);
    } else {
      this.loadAllAccounts();
    }
  }

  getCustomerName(customerId: number | undefined): string {
    if (customerId === undefined || customerId === null) {
      console.warn('Customer ID is undefined or null');
      return 'No Customer Assigned';
    }

    const normalizedId = Number(customerId);
    if (this.customerMap.has(normalizedId)) {
      return this.customerMap.get(normalizedId)!;
    }

    const customer = this.customers.find(c => Number(c.id) === normalizedId);
    if (customer) {
      this.customerMap.set(normalizedId, customer.name);
      return customer.name;
    }

    console.warn(`Customer with ID ${normalizedId} not found in customers:`, this.customers.map(c => c.id));
    return `Customer ID: ${normalizedId}`;
  }

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.pageIndex = 0; // Reset to first page on search
    this.searchSubject.next(value);
  }

  clearSearch() {
    this.searchKeyword = '';
    this.pageIndex = 0;
    this.loadAllAccounts();
  }

  searchAccounts(keyword: string) {
    if (!keyword || keyword.trim() === '') {
      this.loadAllAccounts();
      return;
    }

    this.isLoading = true;
    console.log('Searching accounts with keyword:', keyword);
    this.bankingService.searchBankAccounts(keyword, this.pageIndex, this.pageSize).subscribe({
      next: (response: { accounts: BankAccountDTO[], total: number }) => {
        this.accounts = response.accounts || [];
        this.totalAccounts = response.total || 0;
        console.log('Search results:', this.accounts.map(a => ({ id: a.id, customerId: a.customer?.id, type: a.type })));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Search accounts error:', err);
        this.bankingService.showError(`Failed to search accounts: ${err.status} ${err.statusText}`);
        this.accounts = [];
        this.totalAccounts = 0;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  deleteAccount(accountId: string) {
    if (confirm('Are you sure you want to delete this account?')) {
      console.log('Deleting account:', accountId);
      this.bankingService.deleteBankAccount(accountId).subscribe({
        next: () => {
          console.log('Account deleted:', accountId);
          this.bankingService.showSuccess('Account deleted successfully');
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
