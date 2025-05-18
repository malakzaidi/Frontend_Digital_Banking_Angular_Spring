import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import {environment} from '../../environments/environment';

export interface CustomerDTO {
  id?: number;
  name: string;
  email: string;
}

export interface BankAccountDTO {
  id: string;
  balance: number;
  createdAt: string;
  customerId: number;
  type: string;
}

export interface CurrentBankAccountDTO extends BankAccountDTO {
  overDraft: number;
}

export interface SavingBankAccountDTO extends BankAccountDTO {
  interestRate: number;
}

export interface AccountOperationDTO {
  id: number;
  operationDate: string;
  amount: number;
  type: string;
  description: string;
}

export interface AccountHistoryDTO {
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  operations: AccountOperationDTO[];
}

export interface DebitDTO {
  accountId: string;
  amount: number;
  description: string;
}

export interface CreditDTO {
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

  getCustomers(): Observable<CustomerDTO[]> {
    console.log('BankingService: Fetching customers');
    if (!isPlatformBrowser(this.platformId)) {
      console.log('BankingService: Running on server, returning empty array for getCustomers');
      return of([]);
    }
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers`).pipe(
      map(customers => {
        console.log('BankingService: Customers fetched:', customers);
        return customers;
      }),
      catchError(err => {
        console.error('BankingService: Get customers error:', err);
        const message = err.message || 'Unknown error';
        this.showError(`Failed to fetch customers: ${message}`);
        return throwError(() => err);
      })
    );
  }

  saveCurrentBankAccount(initialBalance: number, overDraft: number, customerId: number): Observable<CurrentBankAccountDTO> {
    console.log('Saving current account:', { initialBalance, overDraft, customerId });
    const body = { initialBalance, overDraft, customerId };
    return this.http.post<CurrentBankAccountDTO>(`${this.apiUrl}/accounts/current`, body).pipe(
      map(response => {
        this.snackBar.open('Current account created successfully', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        console.error('Save current account error:', err);
        this.showError(`Failed to create current account: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }

  saveSavingBankAccount(initialBalance: number, interestRate: number, customerId: number): Observable<SavingBankAccountDTO> {
    console.log('Saving saving account:', { initialBalance, interestRate, customerId });
    const body = { initialBalance, interestRate, customerId };
    return this.http.post<SavingBankAccountDTO>(`${this.apiUrl}/accounts/saving`, body).pipe(
      map(response => {
        this.snackBar.open('Saving account created successfully', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        console.error('Save saving account error:', err);
        this.showError(`Failed to create saving account: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }

  getCustomer(id: number): Observable<CustomerDTO> {
    console.log('Fetching customer with ID:', id);
    return this.http.get<CustomerDTO>(`${this.apiUrl}/customers/${id}`).pipe(
      map(customer => {
        console.log('Fetched customer:', customer);
        return customer;
      }),
      catchError(err => {
        console.error('Get customer error:', err);
        this.showError(`Failed to fetch customer: ${err.message || err}`);
        return throwError(() => err);
      })
    );
  }

  saveCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    console.log('Saving customer:', customer);
    return this.http.post<CustomerDTO>(`${this.apiUrl}/customers`, customer).pipe(
      map(response => {
        this.snackBar.open('Customer saved successfully', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        console.error('Save customer error:', err);
        this.showError(`Failed to save customer: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }

  updateCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    console.log('Updating customer:', customer);
    return this.http.put<CustomerDTO>(`${this.apiUrl}/customers/${customer.id}`, customer).pipe(
      map(response => {
        this.snackBar.open('Customer updated successfully', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        console.error('Update customer error:', err);
        this.showError(`Failed to update customer: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }

  deleteCustomer(id: number): Observable<void> {
    console.log('Deleting customer:', id);
    return this.http.delete<void>(`${this.apiUrl}/customers/${id}`).pipe(
      map(() => {
        this.snackBar.open('Customer deleted successfully', 'Close', { duration: 3000 });
      }),
      catchError(err => {
        console.error('Delete customer error:', err);
        const message = err.status === 400 && err.error?.includes('non-zero balance')
          ? err.error
          : `Failed to delete customer: ${err.status || 'Unknown'} ${err.statusText || err.message}`;
        this.showError(message);
        return throwError(() => err);
      })
    );
  }


  getBankAccounts(): Observable<BankAccountDTO[]> {
    console.log('Fetching bank accounts');
    return this.http.get<BankAccountDTO[]>(`${this.apiUrl}/accounts`).pipe(
      catchError(err => {
        console.error('Get bank accounts error:', err);
        this.showError(`Failed to fetch bank accounts: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }

  deleteBankAccount(accountId: string): Observable<void> {
    console.log('Deleting bank account:', accountId);
    return this.http.delete<void>(`${this.apiUrl}/accounts/${accountId}`).pipe(
      map(() => {
        this.snackBar.open('Bank account deleted successfully', 'Close', { duration: 3000 });
      }),
      catchError(err => {
        console.error('Delete bank account error:', err);
        const message = err.status === 400
          ? 'Cannot delete account with non-zero balance'
          : `Failed to delete bank account: ${err.status || 'Unknown'} ${err.statusText || err.message}`;
        this.showError(message);
        return throwError(() => err);
      })
    );
  }

  getAccountHistory(accountId: string): Observable<AccountOperationDTO[]> {
    console.log('Fetching account history:', accountId);
    return this.http.get<AccountOperationDTO[]>(`${this.apiUrl}/accounts/${accountId}/operations`).pipe(
      catchError(err => {
        console.error('Get account history error:', err);
        this.showError(`Failed to fetch account history: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }

  getPagedAccountHistory(accountId: string, page: number, size: number): Observable<AccountHistoryDTO> {
    console.log('Fetching paged account history:', accountId, page, size);
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<AccountHistoryDTO>(`${this.apiUrl}/accounts/${accountId}/pageOperations`, { params }).pipe(
      catchError(err => {
        console.error('Get paged account history error:', err);
        this.showError(`Failed to fetch account history: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }

  debit(debit: DebitDTO): Observable<DebitDTO> {
    console.log('Debiting:', debit);
    return this.http.post<DebitDTO>(`${this.apiUrl}/accounts/debit`, debit).pipe(
      map(response => {
        this.snackBar.open('Debit successful', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        console.error('Debit error:', err);
        this.showError(`Debit failed: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }

  credit(credit: CreditDTO): Observable<CreditDTO> {
    console.log('Crediting:', credit);
    return this.http.post<CreditDTO>(`${this.apiUrl}/accounts/credit`, credit).pipe(
      map(response => {
        this.snackBar.open('Credit successful', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        console.error('Credit error:', err);
        this.showError(`Credit failed: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }

  transfer(transfer: TransferRequestDTO): Observable<void> {
    console.log('Transferring:', transfer);
    return this.http.post<void>(`${this.apiUrl}/accounts/transfer`, transfer).pipe(
      map(() => {
        this.snackBar.open('Transfer successful', 'Close', { duration: 3000 });
      }),
      catchError(err => {
        console.error('Transfer error:', err);
        this.showError(`Transfer failed: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }
  searchBankAccounts(keyword: string): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${this.apiUrl}/accounts/search?keyword=${keyword}`);
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }
  // Helper methods
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
  searchCustomers(keyword: string): Observable<CustomerDTO[]> {
    console.log('Searching customers:', keyword);
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers/search`, { params }).pipe(
      catchError(err => {
        console.error('Search customers error:', err);
        this.showError(`Failed to search customers: ${err.status || 'Unknown'} ${err.statusText || err.message}`);
        return throwError(() => err);
      })
    );
  }


}
