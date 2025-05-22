import { Component, signal } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { BankingService, BankAccountDTO, AccountOperationDTO } from '../services/banking.service';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, CommonModule, TransactionFormComponent, RouterLink],
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent {
  account = signal<BankAccountDTO>({ id: '', balance: 0, customerId: 0, type: '' });
  operations = signal<AccountOperationDTO[]>([]);
  displayedColumns: string[] = ['id', 'date', 'type', 'amount', 'description'];

  constructor(private route: ActivatedRoute, private bankingService: BankingService) {
    const accountId = this.route.snapshot.paramMap.get('accountId');
    if (accountId) {
      this.loadAccountDetails(accountId);
      this.loadOperations(accountId);
    }
  }

  loadAccountDetails(accountId: string) {
    this.bankingService.getAccountDetails(accountId).subscribe({
      next: (data: BankAccountDTO) => {
        this.account.set(data);
      },
      error: (err: any) => {
        console.error('Error loading account details:', err);
        this.bankingService.showError('Failed to load account details');
      }
    });
  }

  loadOperations(accountId: string) {
    this.bankingService.getAccountOperations(accountId).subscribe({
      next: (data: AccountOperationDTO[]) => {
        this.operations.set(data);
      },
      error: (err: any) => {
        console.error('Error loading operations:', err);
        this.bankingService.showError('Failed to load account operations');
      }
    });
  }
}
