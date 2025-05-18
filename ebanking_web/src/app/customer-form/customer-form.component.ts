import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {BankingService, CustomerDTO} from '../services/banking.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule],
  template: `
    <h2>{{ isEdit ? 'Edit Customer' : 'Add Customer' }}</h2>
    <form (ngSubmit)="saveCustomer()">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="customer.name" name="name" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput [(ngModel)]="customer.email" name="email" type="email" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="!customer.name || !customer.email">Save</button>
      <button mat-raised-button color="accent" type="button" (click)="cancel()">Cancel</button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 20px; max-width: 400px; }
    button { margin-right: 10px; }
  `]
})
export class CustomerFormComponent implements OnInit {
  customer: CustomerDTO = { name: '', email: '' };
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
      this.bankingService.getCustomer(+id).subscribe(customer => {
        this.customer = customer;
      });
    }
  }

  saveCustomer() {
    if (this.isEdit) {
      this.bankingService.updateCustomer(this.customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    } else {
      this.bankingService.saveCustomer(this.customer).subscribe(() => {
        this.router.navigate(['/customers']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/customers']);
  }
}
