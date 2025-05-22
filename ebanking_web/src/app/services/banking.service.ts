import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// DTO Interfaces (already defined in your previous context)
export interface CustomerDTO {
  id?: number;
  name: string;
  email: string;
}

export interface BankAccountDTO {
  id?: string;
  balance: number;
  customerId: number;
  customerName?: string;
  type: string;
}

export interface AccountOperationDTO {
  id?: number;
  operationDate: Date;
  amount: number;
  type: string;
  description: string;
}

export interface AccountHistoryDTO {
  accountId: string;
  balance: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  accountOperationDTOS: AccountOperationDTO[];
}

export interface CreditDTO {
  accountId: string;
  amount: number;
  description: string;
}

export interface DebitDTO {
  accountId: string;
  amount: number;
  description: string;
}

export interface TransferRequestDTO {
  accountSource: string;
  accountDestination: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Existing methods (from previous context)
  getCustomers(): Observable<CustomerDTO[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]);
    }
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers`).pipe(
      catchError(err => {
        this.showError(`Failed to fetch customers: ${err.message || 'Unknown error'}`);
        return of([]);
      })
    );
  }

  getCustomer(customerId: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.apiUrl}/customers/${customerId}`).pipe(
      catchError(err => {
        this.showError(`Failed to fetch customer: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  saveCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(`${this.apiUrl}/customers`, customer).pipe(
      catchError(err => {
        this.showError(`Failed to save customer: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  updateCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.put<CustomerDTO>(`${this.apiUrl}/customers/${customer.id}`, customer).pipe(
      catchError(err => {
        this.showError(`Failed to update customer: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/customers/${customerId}`).pipe(
      catchError(err => {
        this.showError(`Failed to delete customer: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  searchCustomers(keyword: string): Observable<CustomerDTO[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers/search`, { params }).pipe(
      catchError(err => {
        this.showError(`Failed to search customers: ${err.message || 'Unknown error'}`);
        return of([]);
      })
    );
  }

  getBankAccounts(page: number, size: number): Observable<{ accounts: BankAccountDTO[], total: number }> {
    if (!isPlatformBrowser(this.platformId)) {
      return of({ accounts: [], total: 0 });
    }
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<{ accounts: BankAccountDTO[], total: number }>(`${this.apiUrl}/accounts`, { params }).pipe(
      catchError(err => {
        this.showError(`Failed to fetch accounts: ${err.message || 'Unknown error'}`);
        return of({ accounts: [], total: 0 });
      })
    );
  }

  getUserAccounts(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${this.apiUrl}/accounts/user`).pipe(
      catchError(err => {
        this.showError(`Failed to fetch user accounts: ${err.message || 'Unknown error'}`);
        return of([]);
      })
    );
  }

  searchBankAccounts(keyword: string, page: number, size: number): Observable<{ accounts: BankAccountDTO[], total: number }> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{ accounts: BankAccountDTO[], total: number }>(`${this.apiUrl}/accounts/search`, { params }).pipe(
      catchError(err => {
        this.showError(`Failed to search accounts: ${err.message || 'Unknown error'}`);
        return of({ accounts: [], total: 0 });
      })
    );
  }

  deleteBankAccount(accountId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/accounts/${accountId}`).pipe(
      catchError(err => {
        this.showError(`Failed to delete account: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  saveCurrentBankAccount(initialBalance: number, overDraft: number, customerId: number): Observable<BankAccountDTO> {
    const body = { initialBalance, overDraft, customerId };
    return this.http.post<BankAccountDTO>(`${this.apiUrl}/accounts/current`, body).pipe(
      catchError(err => {
        this.showError(`Failed to save current account: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  saveSavingBankAccount(initialBalance: number, interestRate: number, customerId: number): Observable<BankAccountDTO> {
    const body = { initialBalance, interestRate, customerId };
    return this.http.post<BankAccountDTO>(`${this.apiUrl}/accounts/saving`, body).pipe(
      catchError(err => {
        this.showError(`Failed to save saving account: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  getPagedAccountHistory(accountId: string, page: number, size: number): Observable<AccountHistoryDTO> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<AccountHistoryDTO>(`${this.apiUrl}/accounts/${accountId}/pageOperations`, { params }).pipe(
      catchError(err => {
        this.showError(`Failed to fetch account history: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  credit(credit: CreditDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/accounts/credit`, credit).pipe(
      catchError(err => {
        this.showError(`Failed to perform credit operation: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  debit(debit: DebitDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/accounts/debit`, debit).pipe(
      catchError(err => {
        this.showError(`Failed to perform debit operation: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  transfer(transfer: TransferRequestDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/accounts/transfer`, transfer).pipe(
      catchError(err => {
        this.showError(`Failed to perform transfer: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  // New methods for AccountDetailsComponent
  getAccountDetails(accountId: string): Observable<BankAccountDTO> {
    return this.http.get<BankAccountDTO>(`${this.apiUrl}/accounts/${accountId}`).pipe(
      catchError(err => {
        this.showError(`Failed to fetch account details: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  getAccountOperations(accountId: string): Observable<AccountOperationDTO[]> {
    return this.http.get<AccountOperationDTO[]>(`${this.apiUrl}/accounts/${accountId}/operations`).pipe(
      catchError(err => {
        this.showError(`Failed to fetch account operations: ${err.message || 'Unknown error'}`);
        throw err;
      })
    );
  }

  showError(message: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.snackBar.open(message, 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    }
  }

  showSuccess(message: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }
  }
}
