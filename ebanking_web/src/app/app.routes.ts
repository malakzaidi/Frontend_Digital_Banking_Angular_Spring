import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { BankAccountListComponent } from './bank-account-list/bank-account-list.component';
import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { AccountHistoryComponent } from './account-history/account-history.component';
import { TransferFormComponent } from './transfer-form/transfer-form.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import {ChangePasswordComponent} from './change-password/change-password';
import {RegisterComponent} from './register/register.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'customers', component: CustomerListComponent, canActivate: [AuthGuard] },
  { path: 'customers/new', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: 'customers/edit/:id', component: CustomerFormComponent, canActivate: [AuthGuard] },
  { path: 'accounts', component: BankAccountListComponent, canActivate: [AuthGuard] },
  { path: 'accounts/new', component: BankAccountFormComponent, canActivate: [AuthGuard] },
  { path: 'accounts/edit/:id', component: BankAccountFormComponent, canActivate: [AuthGuard] },
  { path: 'accounts/history/:id', component: AccountHistoryComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionFormComponent, canActivate: [AuthGuard] },
  { path: 'transfer', component: TransferFormComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: CustomerListComponent, canActivate: [AuthGuard,AdminGuard ] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
