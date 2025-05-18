import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import {BankingService} from '../services/banking.service';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, CommonModule, TransactionFormComponent],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  account = signal<any>({});
  operations = signal<any[]>([]);
  displayedColumns: string[] = ['id', 'date', 'type', 'amount', 'description'];

  constructor(private route: ActivatedRoute, private bankingService: BankingService) {
    const accountId = this.route.snapshot.paramMap.get('accountId');
    if (accountId) {
      this.loadAccountDetails(accountId);
      this.loadOperations(accountId);
    }
  }

  loadAccountDetails(accountId: string) {
    this.bankingService.getAccountDetails(accountId).subscribe(data => {
      this.account.set(data);
    });
  }

  loadOperations(accountId: string) {
    this.bankingService.getAccountOperations(accountId).subscribe(data => {
      this.operations.set(data);
    });
  }
}
