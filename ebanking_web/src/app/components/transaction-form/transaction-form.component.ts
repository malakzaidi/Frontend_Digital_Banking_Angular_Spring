import { Component, Input } from '@angular/core';
import { BankingService } from '../../services/banking.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, MatSnackBarModule],
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent {
  @Input() accountId: string = '';
  amount: number = 0;
  description: string = '';
  operationType: string = 'CREDIT';
  toAccountId: string = '';

  constructor(private bankingService: BankingService, private snackBar: MatSnackBar) {}

  performTransaction() {
    if (this.operationType === 'TRANSFER' && this.toAccountId) {
      this.bankingService.transfer(this.accountId, this.toAccountId, this.amount, this.description)
        .subscribe({
          next: () => this.showSuccess('Transfer successful'),
          error: (err) => this.showError(err.message)
        });
    } else if (this.operationType === 'DEBIT') {
      this.bankingService.debit(this.accountId, this.amount, this.description)
        .subscribe({
          next: () => this.showSuccess('Debit successful'),
          error: (err) => this.showError(err.message)
        });
    } else {
      this.bankingService.credit(this.accountId, this.amount, this.description)
        .subscribe({
          next: () => this.showSuccess('Credit successful'),
          error: (err) => this.showError(err.message)
        });
    }
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
    this.resetForm();
  }

  private showError(message: string) {
    this.snackBar.open('Error: ' + message, 'Close', { duration: 3000 });
  }

  private resetForm() {
    this.amount = 0;
    this.description = '';
    this.toAccountId = '';
    this.operationType = 'CREDIT';
  }
}
