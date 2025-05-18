import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import {AccountOperationDTO, BankingService} from '../services/banking.service';

@Component({
  selector: 'app-account-history',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule, CommonModule],
  template: `
    <h2>Account History</h2>
    <table mat-table [dataSource]="operations" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef>ID</th>
        <td mat-cell *matCellDef="let operation">{{ operation.id }}</td>
      </ng-container>
      <ng-container matColumnDef="operationDate">
        <th mat-header-cell *matHeaderCellDef>Date</th>
        <td mat-cell *matCellDef="let operation">{{ operation.operationDate | date }}</td>
      </ng-container>
      <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef>Amount</th>
        <td mat-cell *matCellDef="let operation">{{ operation.amount | currency }}</td>
      </ng-container>
      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef>Type</th>
        <td mat-cell *matCellDef="let operation">{{ operation.type }}</td>
      </ng-container>
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Description</th>
        <td mat-cell *matCellDef="let operation">{{ operation.description }}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
    <mat-paginator
      [length]="totalItems"
      [pageSize]="pageSize"
      [pageIndex]="currentPage"
      [pageSizeOptions]="[5, 10, 20]"
      (page)="handlePageEvent($event)">
    </mat-paginator>
  `,
  styles: [`
    table { width: 100%; margin-bottom: 20px; }
  `]
})
export class AccountHistoryComponent implements OnInit {
  accountId: string = '';
  operations: AccountOperationDTO[] = [];
  displayedColumns: string[] = ['id', 'operationDate', 'amount', 'type', 'description'];
  currentPage: number = 0;
  pageSize: number = 5;
  totalItems: number = 0;

  constructor(
    private bankingService: BankingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.accountId = this.route.snapshot.paramMap.get('id') || '';
    this.loadHistory();
  }

  loadHistory() {
    this.bankingService.getPagedAccountHistory(this.accountId, this.currentPage, this.pageSize).subscribe(history => {
      this.operations = history.operations;
      this.currentPage = history.currentPage;
      this.pageSize = history.pageSize;
      this.totalItems = history.totalPages * history.pageSize;
    });
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHistory();
  }
}
