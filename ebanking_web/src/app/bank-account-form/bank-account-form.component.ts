import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {BankAccountDTO, BankingService} from '../services/banking.service';

@Component({
  selector: 'app-bank-account-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, FormsModule, CommonModule],
  template: `
    <h2>{{ isEdit ? 'Edit Account' : 'Add Account' }}</h2>
    <form (ngSubmit)="saveAccount()">
      <mat-form-field>
        <mat-label>Customer ID</mat-label>
        <input matInput [(ngModel)]="account.customerId" name="customerId" type="number" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Balance</mat-label>
        <input matInput [(ngModel)]="account.balance" name="balance" type="number" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Type</mat-label>
        <mat-select [(ngModel)]="account.type" name="type" required>
          <mat-option value="SAVINGS">Savings</mat-option>
          <mat-option value="CHECKING">Checking</mat-option>
        </mat-select>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="!account.customerId || !account.balance || !account.type">Save</button>
      <button mat-raised-button color="accent" type="button" (click)="cancel()">Cancel</button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 20px; max-width: 400px; }
    button { margin-right: 10px; }
  `]
})
export class BankAccountFormComponent implements OnInit {
  account: BankAccountDTO = { id: '', balance: 0, createdAt: '', customerId: 0, type: '' };
  isEdit: boolean = false;

  constructor(
    private bankingService: BankingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.bankingService.getBankAccount(id).subscribe(account => {
        this.account = account;
      });
    }
  }

  saveAccount() {
    if (this.isEdit) {
      // Assume update endpoint exists
      this.bankingService.saveBankAccount(this.account).subscribe(() => {
        this.router.navigate(['/accounts']);
      });
    } else {
      this.bankingService.saveBankAccount(this.account).subscribe(() => {
        this.router.navigate(['/accounts']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/accounts']);
  }
}
