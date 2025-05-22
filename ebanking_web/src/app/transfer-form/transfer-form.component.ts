import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { BankingService, TransferRequestDTO } from '../services/banking.service';

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
          <input matInput [(ngModel)]="transfer.accountSource" name="accountSource" required>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Destination Account ID</mat-label>
          <input matInput [(ngModel)]="transfer.accountDestination" name="accountDestination" required>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Amount</mat-label>
          <input matInput [(ngModel)]="transfer.amount" name="amount" type="number" required>
        </mat-form-field>
        <div class="button-container">
          <button mat-raised-button color="primary" type="submit" [disabled]="!transfer.accountSource || !transfer.accountDestination || !transfer.amount">
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
    accountSource: '',
    accountDestination: '',
    amount: 0
  };

  constructor(
    private bankingService: BankingService,
    private router: Router
  ) {}

  performTransfer() {
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
}
