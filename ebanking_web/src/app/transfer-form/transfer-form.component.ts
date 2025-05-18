import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {BankingService, TransferRequestDTO} from '../services/banking.service';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  template: `
    <h2>Transfer</h2>
    <form (ngSubmit)="submitTransfer()">
      <mat-form-field>
        <mat-label>Source Account ID</mat-label>
        <input matInput [(ngModel)]="transfer.accountSource" name="accountSource" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Destination Account ID</mat-label>
        <input matInput [(ngModel)]="transfer.accountDestination" name="accountDestination" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Amount</mat-label>
        <input matInput [(ngModel)]="transfer.amount" name="amount" type="number" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="!transfer.accountSource || !transfer.accountDestination || !transfer.amount">Transfer</button>
      <button mat-raised-button color="accent" type="button" (click)="cancel()">Cancel</button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 20px; max-width: 400px; }
    button { margin-right: 10px; }
  `]
})
export class TransferFormComponent {
  transfer: TransferRequestDTO = { accountSource: '', accountDestination: '', amount: 0 };

  constructor(private bankingService: BankingService, private router: Router) {}

  submitTransfer() {
    this.bankingService.transfer(this.transfer).subscribe(() => {
      this.router.navigate(['/accounts']);
    });
  }

  cancel() {
    this.router.navigate(['/accounts']);
  }
}
