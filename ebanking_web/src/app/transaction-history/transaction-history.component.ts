import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankingService } from '../services/banking.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="transaction-history">
      <h2>Transaction History</h2>
      <div *ngIf="transactions.length > 0; else noTransactions">
        <table class="transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Account ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Performed By</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let transaction of transactions">
              <td>{{ transaction.id }}</td>
              <td>{{ transaction.accountId }}</td>
              <td>{{ transaction.type }}</td>
              <td>{{ transaction.amount | currency }}</td>
              <td>{{ transaction.date | date:'medium' }}</td>
              <td>{{ transaction.performedBy }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ng-template #noTransactions>
        <p>No transactions found.</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .transaction-history {
      max-width: 1000px;
      margin: 50px auto;
      padding: 20px;
      background-color: #FFFFFF;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    h2 {
      font-size: 2.2rem;
      font-weight: 400;
      text-align: center;
      color: #00695C;
    }
    .transaction-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .transaction-table th, .transaction-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
      font-family: 'Roboto', sans-serif;
    }
    .transaction-table th {
      background-color: #00695C;
      color: #FFFFFF;
    }
    p {
      text-align: center;
      font-size: 1.1rem;
      color: #666;
      font-family: 'Roboto', sans-serif;
    }
  `]
})
export class TransactionHistoryComponent {
  transactions: any[] = [];

  constructor(
    private bankingService: BankingService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTransactions();
    }
  }

  private loadTransactions() {
    this.bankingService.getTransactionHistory().subscribe({
      next: (transactions: any[]) => {
        this.transactions = transactions;
      },
      error: (err: any) => {
        console.error('Error loading transaction history:', err);
      }
    });
  }
}
