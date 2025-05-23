import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AccountHistoryDTO, AccountOperationDTO, BankAccountDTO,
  CreditDTO, CustomerDTO, DebitDTO,
  TransactionHistoryDTO, TransferRequestDTO
} from '../banking-dtos';

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private snackBar: MatSnackBar
  ) {}

  // Utility methods for notifications
  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  // Account-related methods
  getUserAccounts(): Observable<BankAccountDTO[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<BankAccountDTO[]>(`${this.apiUrl}/accounts`, { headers });
  }

  getBankAccounts(page: number, size: number): Observable<{ content: BankAccountDTO[], totalElements: number }> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ content: BankAccountDTO[], totalElements: number }>(
      `${this.apiUrl}/accounts?page=${page}&size=${size}`, { headers }
    );
  }

  searchBankAccounts(keyword: string, page: number, size: number): Observable<{ content: BankAccountDTO[], totalElements: number }> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ content: BankAccountDTO[], totalElements: number }>(
      `${this.apiUrl}/accounts/search?keyword=${keyword}&page=${page}&size=${size}`, { headers }
    );
  }

  saveCurrentBankAccount(initialBalance: number, overDraft: number, customerId: number): Observable<BankAccountDTO> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = { initialBalance, overDraft, customerId, userId: this.getUserId() };
    return this.http.post<BankAccountDTO>(`${this.apiUrl}/accounts/current`, data, { headers });
  }

  saveSavingBankAccount(initialBalance: number, interestRate: number, customerId: number): Observable<BankAccountDTO> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = { initialBalance, interestRate, customerId, userId: this.getUserId() };
    return this.http.post<BankAccountDTO>(`${this.apiUrl}/accounts/saving`, data, { headers });
  }

  deleteBankAccount(accountId: string): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/accounts/${accountId}`, { headers });
  }

  getPagedAccountHistory(accountId: string, page: number, size: number): Observable<AccountHistoryDTO> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AccountHistoryDTO>(
      `${this.apiUrl}/accounts/${accountId}/history?page=${page}&size=${size}`, { headers }
    );
  }

  // New method: Fetch account details by accountId
  getAccountDetails(accountId: string): Observable<BankAccountDTO> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<BankAccountDTO>(`${this.apiUrl}/accounts/${accountId}`, { headers });
  }

  // New method: Fetch all operations for an account
  getAccountOperations(accountId: string): Observable<AccountOperationDTO[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AccountOperationDTO[]>(`${this.apiUrl}/accounts/${accountId}/operations`, { headers });
  }

  // Customer-related methods
  getCustomers(): Observable<CustomerDTO[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers`, { headers });
  }

  searchCustomers(keyword: string): Observable<CustomerDTO[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers/search?keyword=${keyword}`, { headers });
  }

  getCustomer(id: number): Observable<CustomerDTO> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CustomerDTO>(`${this.apiUrl}/customers/${id}`, { headers });
  }

  saveCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = { ...customer, userId: this.getUserId() };
    return this.http.post<CustomerDTO>(`${this.apiUrl}/customers`, data, { headers });
  }

  updateCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = { ...customer, userId: this.getUserId() };
    return this.http.put<CustomerDTO>(`${this.apiUrl}/customers/${customer.id}`, data, { headers });
  }

  deleteCustomer(id: number): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/customers/${id}`, { headers });
  }

  // Transaction-related methods
  payBill(data: { accountId: string, billerName: string, amount: number, userId: string }): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/bills/pay`, data, { headers });
  }

  getTransactionHistory(): Observable<TransactionHistoryDTO[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<TransactionHistoryDTO[]>(`${this.apiUrl}/transactions/history`, { headers });
  }

  credit(credit: CreditDTO): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/transactions/credit`, credit, { headers });
  }

  debit(debit: DebitDTO): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/transactions/debit`, debit, { headers });
  }

  transfer(transfer: TransferRequestDTO): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.apiUrl}/transfers`, transfer, { headers });
  }

  private getToken(): string {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') || '' : '';
  }

  private getUserId(): string {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub || '';
    }
    return '';
  }
}
