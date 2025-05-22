import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccountHistoryDTO, AccountOperationDTO, BankingService } from '../services/banking.service';

@Component({
  selector: 'app-account-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    RouterLink
  ],
  template: `
    <div class="container">
      <h2>Account History</h2>

      <div class="table-container mat-elevation-z8">
        <table mat-table [dataSource]="operations" *ngIf="history && (history.accountOperationDTOS!.length > 0 || isLoading)">
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let operation">{{ operation.operationDate | date:'medium' }}</td>
          </ng-container>
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let operation">{{ operation.type }}</td>
          </ng-container>
          <ng-container matColumnDef="amount">
            <th mat-header-cell *matHeaderCellDef>Amount</th>
            <td mat-cell *matCellDef="let operation">{{ operation.amount | currency }}</td>
          </ng-container>
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let operation">{{ operation.description }}</td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator
          [length]="history ? history.totalPages! * pageSize : 0"
          [pageSize]="pageSize"
          [pageSizeOptions]="[5, 10, 20]"
          [pageIndex]="currentPage"
          (page)="onPageChange($event)"
          *ngIf="history && history.accountOperationDTOS!.length > 0">
        </mat-paginator>
      </div>

      <div *ngIf="history && history.accountOperationDTOS!.length === 0 && !isLoading" class="no-results">
        No operations found for this account.
      </div>

      <div class="info-container">
        <p><strong>Account ID:</strong> {{ history?.accountId }}</p>
        <p><strong>Balance:</strong> {{ history?.balance | currency }}</p>
      </div>

      <div class="button-container">
        <button mat-raised-button color="primary" routerLink="/accounts">Back to Accounts</button>
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
    .no-results {
      text-align: center;
      margin: 20px 0;
      font-style: italic;
      color: #666;
    }
    .info-container {
      margin-bottom: 20px;
    }
    .button-container {
      margin-top: 20px;
    }
  `]
})
export class AccountHistoryComponent implements OnInit {
  history: AccountHistoryDTO | null = null;
  operations: AccountOperationDTO[] = [];
  displayedColumns: string[] = ['date', 'type', 'amount', 'description'];
  accountId: string = '';
  currentPage: number = 0;
  pageSize: number = 5;
  isLoading: boolean = true;

  constructor(
    private bankingService: BankingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.accountId = this.route.snapshot.paramMap.get('id') || '';
    if (this.accountId) {
      this.loadHistory();
    } else {
      this.isLoading = false;
      this.bankingService.showError('Account ID not provided');
    }
  }

  loadHistory() {
    this.isLoading = true;
    this.bankingService.getPagedAccountHistory(this.accountId, this.currentPage, this.pageSize).subscribe({
      next: (history: AccountHistoryDTO) => {
        this.history = history;
        this.operations = history.accountOperationDTOS;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Load history error:', err);
        this.bankingService.showError(`Failed to load account history: ${err.status} ${err.statusText}`);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHistory();
  }
}
