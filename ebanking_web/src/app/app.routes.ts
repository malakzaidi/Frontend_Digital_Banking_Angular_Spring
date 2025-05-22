import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { BankAccountListComponent } from './bank-account-list/bank-account-list.component';
import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { AccountHistoryComponent } from './account-history/account-history.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './services/auth.guard';
import {ChangePasswordComponent} from './change-password/change-password';
import {RegisterComponent} from './register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'customers', component: CustomerListComponent, canActivate: [authGuard] },
  { path: 'customers/new', component: CustomerFormComponent, canActivate: [authGuard] },
  { path: 'customers/edit/:id', component: CustomerFormComponent, canActivate: [authGuard] },
  { path: 'accounts', component: BankAccountListComponent, canActivate: [authGuard] },
  { path: 'accounts/new', component: BankAccountFormComponent, canActivate: [authGuard] },
  { path: 'accounts/edit/:id', component: BankAccountFormComponent, canActivate: [authGuard] },
  { path: 'accounts/history/:id', component: AccountHistoryComponent, canActivate: [authGuard] },
  { path: 'transactions', component: TransactionFormComponent, canActivate: [authGuard] },
  { path: 'transfer', component: TransferFormComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
