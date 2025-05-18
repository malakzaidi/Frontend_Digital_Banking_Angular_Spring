import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {BankingService} from '../services/banking.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, RouterLink, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  customers = signal<any[]>([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  searchKeyword = '';

  constructor(private bankingService: BankingService) {
    this.loadCustomers();
  }

  loadCustomers() {
    this.bankingService.getCustomers().subscribe(data => {
      this.customers.set(data);
    });
  }

  searchCustomers() {
    if (this.searchKeyword) {
      this.bankingService.searchCustomers(this.searchKeyword).subscribe(data => {
        this.customers.set(data);
      });
    } else {
      this.loadCustomers();
    }
  }

  addCustomer() {
    console.log('Add customer dialog'); // Placeholder for dialog
  }
}
