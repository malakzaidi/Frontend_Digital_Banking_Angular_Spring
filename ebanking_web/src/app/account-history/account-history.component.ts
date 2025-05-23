import { Component, OnInit } from '@angular/core';
import { BankingService } from '../services/banking.service';
import { AccountHistoryDTO, AccountOperationDTO } from '../banking-dtos';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-history',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  template: `
    <div class="container">
      <h2>Account History</h2>
      <table mat-table [dataSource]="operations" class="mat-elevation-z8">
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
                     [length]="totalOperations"
                     (page)="onPageChange($event)"
                     showFirstLastButtons>
      </mat-paginator>
    </div>
  `,
  styles: [`
    .container { padding: 20px; max-width: 1000px; margin: 0 auto; }
    h2 { text-align: center; color: #333; }
    table { width: 100%; margin-bottom: 20px; }
  `]
})
export class AccountHistoryComponent implements OnInit {
  accountId: string = '';
  operations: AccountOperationDTO[] = [];
  displayedColumns: string[] = ['operationDate', 'type', 'amount', 'description'];
  currentPage = 0;
  pageSize = 5;
  totalOperations = 0;

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.loadAccountHistory();
  }

  loadAccountHistory() {
    this.bankingService.getAccountHistory(this.accountId, this.currentPage, this.pageSize).subscribe({
      next: (response: AccountHistoryDTO) => {
        this.operations = response.operations || [];
        this.currentPage = response.currentPage || 0;
        this.pageSize = response.pageSize || 5;
        this.totalOperations = response.totalOperations || 0;
      },
      error: (err) => {
        console.error('Error loading account history:', err);
        this.bankingService.showError('Failed to load account history');
      }
    });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadAccountHistory();
  }
}
