import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { TransferRequestDTO } from '../banking-dtos';
import { BankingService } from '../services/banking.service';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="container">
      <h2>Transfer</h2>
      <form (ngSubmit)="performTransfer()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Source Account ID</mat-label>
          <input matInput [(ngModel)]="transfer.accountIdSource" name="accountIdSource" required>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Destination Account ID</mat-label>
          <input matInput [(ngModel)]="transfer.accountIdDestination" name="accountIdDestination" required>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Amount</mat-label>
          <input matInput [(ngModel)]="transfer.amount" name="amount" type="number" required>
        </mat-form-field>
        <div class="button-container">
          <button mat-raised-button color="primary" type="submit" [disabled]="!transfer.accountIdSource || !transfer.accountIdDestination || !transfer.amount">
            Transfer
          </button>
          <button mat-raised-button color="warn" type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
    }
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
    .button-container {
      display: flex;
      gap: 10px;
    }
  `]
})
export class TransferFormComponent {
  transfer: TransferRequestDTO = {
    accountIdSource: '',
    accountIdDestination: '',
    amount: 0,
    userId: ''
  };

  constructor(
    private bankingService: BankingService,
    private router: Router
  ) {}

  performTransfer() {
    // Set userId before calling the service
    this.transfer.userId = this.getUserId();
    this.bankingService.transfer(this.transfer).subscribe({
      next: () => {
        this.bankingService.showSuccess('Transfer successful');
        this.router.navigate(['/accounts']);
      },
      error: (err: any) => {
        console.error('Transfer error:', err);
        this.bankingService.showError('Failed to perform transfer');
      }
    });
  }

  cancel() {
    this.router.navigate(['/accounts']);
  }

  // Helper method to get userId (assuming BankingService has a public method or private access)
  private getUserId(): string {
    return (this.bankingService as any)['getUserId']() || ''; // Access private method; consider making it public
  }
}
