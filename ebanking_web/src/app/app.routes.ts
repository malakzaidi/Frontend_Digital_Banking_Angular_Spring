import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {BankAccountListComponent} from './bank-account-list/bank-account-list.component';
import {BankAccountFormComponent} from './bank-account-form/bank-account-form.component';
import {TransactionFormComponent} from './transaction-form/transaction-form.component';
import {AccountHistoryComponent} from './account-history/account-history.component';
import {TransferFormComponent} from './transfer-form/transfer-form.component';


export const routes: Routes = [
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/new', component: CustomerFormComponent },
  { path: 'customers/edit/:id', component: CustomerListComponent },
  { path: 'accounts', component: BankAccountListComponent },
  { path: 'accounts/new', component: BankAccountFormComponent },
  { path: 'accounts/edit/:id', component: BankAccountFormComponent },
  { path: 'accounts/history/:id', component: AccountHistoryComponent },
  { path: 'transactions', component: TransactionFormComponent },
  { path: 'transfer', component: TransferFormComponent }
];
