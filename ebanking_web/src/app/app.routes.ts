import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';
import { BankAccountListComponent } from './bank-account-list/bank-account-list.component';
import { BankAccountFormComponent } from './bank-account-form/bank-account-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { AccountHistoryComponent } from './account-history/account-history.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { BillPaymentComponent } from './bill-payment/bill-payment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {UserAccountsComponent} from './user-accounts/user-accounts.component';
import {TransactionComponent} from './transaction-form/transaction-form.component';
import {TransferComponent} from './transfer-form/transfer-form.component';
import {ChangePasswordComponent} from './change-password/change-password';
import {AccountCreationComponent} from './user-account-form/user-account-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Mutual homepage
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  // Admin Routes
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
  {
    path: 'accounts',
    component: BankAccountListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
  {
    path: 'accounts/new',
    component: BankAccountFormComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
  {
    path: 'accounts/history/:id',
    component: AccountHistoryComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
  {
    path: 'customers',
    component: CustomerListComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
  {
    path: 'customers/new',
    component: CustomerFormComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_ADMIN' }
  },
  {
    path: 'customers/edit/:id',
    component: CustomerFormComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_ADMIN' }
  },

  // User Routes
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },
  {
    path: 'my-accounts',
    component: UserAccountsComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },
  {
    path: 'my-accounts/new',
    component: AccountCreationComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },
  {
    path: 'my-accounts/view/:id',
    component: AccountHistoryComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },
  {
    path: 'transactions/new',
    component: TransactionComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },
  {
    path: 'transactions/history',
    component: TransactionHistoryComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },
  {
    path: 'transfer',
    component: TransferComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },
  {
    path: 'bill-payment',
    component: BillPaymentComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [RoleGuard],
    data: { expectedRole: 'ROLE_USER' }
  },

  { path: '**', redirectTo: '/' }
];
