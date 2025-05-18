import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  // Customer APIs
  getCustomers(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers`).pipe(
      catchError(err => {
        this.showError('Failed to fetch customers');
        return throwError(err);
      })
    );
  }

  searchCustomers(keyword: string): Observable<CustomerDTO[]> {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers/search`, { params }).pipe(
      catchError(err => {
        this.showError('Failed to search customers');
        return throwError(err);
      })
    );
  }

  getCustomer(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.apiUrl}/customers/${id}`).pipe(
      catchError(err => {
        this.showError('Failed to fetch customer');
        return throwError(err);
      })
    );
  }

  saveCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(`${this.apiUrl}/customers`, customer).pipe(
      map(response => {
        this.snackBar.open('Customer saved successfully', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        this.showError('Failed to save customer');
        return throwError(err);
      })
    );
  }

  updateCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.put<CustomerDTO>(`${this.apiUrl}/customers/${customer.id}`, customer).pipe(
      map(response => {
        this.snackBar.open('Customer updated successfully', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        this.showError('Failed to update customer');
        return throwError(err);
      })
    );
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/customers/${id}`).pipe(
      map(() => {
        this.snackBar.open('Customer deleted successfully', 'Close', { duration: 3000 });
        return;
      }),
      catchError(err => {
        this.showError('Failed to delete customer');
        return throwError(err);
      })
    );
  }

  // Bank Account APIs
  getBankAccount(accountId: string): Observable<BankAccountDTO> {
    return this.http.get<BankAccountDTO>(`${this.apiUrl}/accounts/${accountId}`).pipe(
      catchError(err => {
        this.showError('Failed to fetch bank account');
        return throwError(err);
      })
    );
  }

  getBankAccounts(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${this.apiUrl}/accounts`).pipe(
      catchError(err => {
        this.showError('Failed to fetch bank accounts');
        return throwError(err);
      })
    );
  }

  // Assume a POST endpoint for creating a bank account (not explicitly in backend, but inferred)
  saveBankAccount(account: BankAccountDTO): Observable<BankAccountDTO> {
    return this.http.post<BankAccountDTO>(`${this.apiUrl}/accounts`, account).pipe(
      map(response => {
        this.snackBar.open('Bank account created successfully', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        this.showError('Failed to create bank account');
        return throwError(err);
      })
    );
  }

  deleteBankAccount(accountId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/accounts/${accountId}`).pipe(
      map(() => {
        this.snackBar.open('Bank account deleted successfully', 'Close', { duration: 3000 });
        return;
      }),
      catchError(err => {
        this.showError('Failed to delete bank account');
        return throwError(err);
      })
    );
  }

  // Transaction APIs
  getAccountHistory(accountId: string): Observable<AccountOperationDTO[]> {
    return this.http.get<AccountOperationDTO[]>(`${this.apiUrl}/accounts/${accountId}/operations`).pipe(
      catchError(err => {
        this.showError('Failed to fetch account history');
        return throwError(err);
      })
    );
  }

  getPagedAccountHistory(accountId: string, page: number, size: number): Observable<AccountHistoryDTO> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<AccountHistoryDTO>(`${this.apiUrl}/accounts/${accountId}/pageOperations`, { params }).pipe(
      catchError(err => {
        this.showError('Failed to fetch account history');
        return throwError(err);
      })
    );
  }

  debit(debit: DebitDTO): Observable<DebitDTO> {
    return this.http.post<DebitDTO>(`${this.apiUrl}/accounts/debit`, debit).pipe(
      map(response => {
        this.snackBar.open('Debit successful', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        this.showError('Debit failed');
        return throwError(err);
      })
    );
  }

  credit(credit: CreditDTO): Observable<CreditDTO> {
    return this.http.post<CreditDTO>(`${this.apiUrl}/accounts/credit`, credit).pipe(
      map(response => {
        this.snackBar.open('Credit successful', 'Close', { duration: 3000 });
        return response;
      }),
      catchError(err => {
        this.showError('Credit failed');
        return throwError(err);
      })
    );
  }

  transfer(transfer: TransferRequestDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/accounts/transfer`, transfer).pipe(
      map(() => {
        this.snackBar.open('Transfer successful', 'Close', { duration: 3000 });
        return;
      }),
      catchError(err => {
        this.showError('Transfer failed');
        return throwError(err);
      })
    );
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }
}
