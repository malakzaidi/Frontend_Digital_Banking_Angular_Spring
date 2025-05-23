import { Component, OnInit } from '@angular/core';
import { BankingService } from '../services/banking.service';
import { TransactionHistoryDTO } from '../banking-dtos';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule],
  template: `
    <div class="container">
      <h2>Transaction History</h2>
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let element">{{ element.date | date }}</td>
        </ng-container>
        <ng-container matColumnDef="type">
          <th mat-header-cell *matHeaderCellDef>Type</th>
          <td mat-cell *matCellDef="let element">{{ element.type }}</td>
        </ng-container>
        <ng-container matColumnDef="amount">
          <th mat-header-cell *matHeaderCellDef>Amount</th>
          <td mat-cell *matCellDef="let element">{{ element.amount }}</td>
        </ng-container>
        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>Description</th>
          <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 25]" (page)="onPageChange($event)" showFirstLastButtons></mat-paginator>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h2 {
      text-align: center;
      color: #333;
    }
    table {
      width: 100%;
      margin-bottom: 20px;
    }
  `]
})
export class TransactionHistoryComponent implements OnInit {
  dataSource: TransactionHistoryDTO[] = [];
  displayedColumns: string[] = ['date', 'type', 'amount', 'description'];
  page = 0;
  size = 10;
  totalElements = 0;

  constructor(private bankingService: BankingService) {}

  ngOnInit() {
    this.loadTransactionHistory();
  }

  loadTransactionHistory() {
    this.bankingService.getTransactionHistory(this.page, this.size).subscribe({
      next: (response: TransactionHistoryDTO[]) => {
        this.dataSource = response;
      },
      error: (err) => {
        console.error('Error loading transaction history:', err);
        this.bankingService.showError('Failed to load transaction history');
      }
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadTransactionHistory();
  }
}
