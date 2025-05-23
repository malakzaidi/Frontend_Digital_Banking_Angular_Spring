import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BankAccountDTO, CurrentBankAccountDTO, SavingBankAccountDTO, CustomerDTO, AccountHistoryDTO, CreditDTO, DebitDTO, TransferRequestDTO, TransactionHistoryDTO, UserAccountRequestDTO, UserTransactionDTO, UserTransferDTO, BillPaymentDTO, DashboardDTO, UserProfile } from '../banking-dtos';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token retrieved for request:', token);
    if (!token) {
      console.warn('No token found in localStorage');
      this.showError('Authentication required. Please log in.');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token || ''}`);
    console.log('Headers for request:', headers);
    return headers;
  }

  getBankAccounts(page: number, size: number): Observable<{ accounts: BankAccountDTO[], total: number }> {
    return this.http.get<{ accounts: BankAccountDTO[], total: number }>(`${this.apiUrl}/accounts?page=${page}&size=${size}`, { headers: this.getHeaders() });
  }

  searchBankAccounts(keyword: string, page: number, size: number): Observable<{ accounts: BankAccountDTO[], total: number }> {
    return this.http.get<{ accounts: BankAccountDTO[], total: number }>(`${this.apiUrl}/accounts/search?keyword=${keyword}&page=${page}&size=${size}`, { headers: this.getHeaders() });
  }

  saveCurrentBankAccount(initialBalance: number, overDraft: number, customerId: number): Observable<CurrentBankAccountDTO> {
    return this.http.post<CurrentBankAccountDTO>(`${this.apiUrl}/accounts/current`, { initialBalance, overDraft, customerId }, { headers: this.getHeaders() });
  }

  saveSavingBankAccount(initialBalance: number, interestRate: number, customerId: number): Observable<SavingBankAccountDTO> {
    return this.http.post<SavingBankAccountDTO>(`${this.apiUrl}/accounts/saving`, { initialBalance, interestRate, customerId }, { headers: this.getHeaders() });
  }

  createUserAccount(initialBalance: number): Observable<BankAccountDTO> {
    return this.http.post<BankAccountDTO>(`${this.apiUrl}/user/accounts/new`, { initialBalance }, { headers: this.getHeaders() });
  }

  getCustomers(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers`, { headers: this.getHeaders() });
  }

  getUserAccounts(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${this.apiUrl}/accounts/user`, { headers: this.getHeaders() });
  }

  getAccountHistory(accountId: string, page: number, size: number): Observable<AccountHistoryDTO> {
    return this.http.get<AccountHistoryDTO>(`${this.apiUrl}/accounts/${accountId}/pageOperations?page=${page}&size=${size}`, { headers: this.getHeaders() });
  }

  searchCustomers(keyword: string): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers/search?keyword=${keyword}`, { headers: this.getHeaders() });
  }

  getCustomer(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.apiUrl}/customers/${id}`, { headers: this.getHeaders() });
  }

  saveCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(`${this.apiUrl}/customers`, customer, { headers: this.getHeaders() });
  }

  updateCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.put<CustomerDTO>(`${this.apiUrl}/customers/${customer.id}`, customer, { headers: this.getHeaders() });
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/customers/${id}`, { headers: this.getHeaders() });
  }

  payBill(billPayment: BillPaymentDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bills/pay`, billPayment, { headers: this.getHeaders() });
  }

  credit(credit: CreditDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/credit`, credit, { headers: this.getHeaders() });
  }

  debit(debit: DebitDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/debit`, debit, { headers: this.getHeaders() });
  }

  userCredit(amount: number, description: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/transactions/credit`, { amount, description }, { headers: this.getHeaders() });
  }

  userDebit(amount: number, description: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/transactions/debit`, { amount, description }, { headers: this.getHeaders() });
  }

  getTransactionHistory(page: number, size: number): Observable<TransactionHistoryDTO[]> {
    return this.http.get<TransactionHistoryDTO[]>(`${this.apiUrl}/transactions/history?page=${page}&size=${size}`, { headers: this.getHeaders() });
  }

  transfer(transfer: TransferRequestDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/transfer`, transfer, { headers: this.getHeaders() });
  }

  userTransfer(recipientIdentifier: string, amount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/transfers`, { recipientIdentifier, amount }, { headers: this.getHeaders() });
  }

  deleteBankAccount(accountId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/accounts/${accountId}`, { headers: this.getHeaders() });
  }

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/user/profile`, { headers: this.getHeaders() });
  }

  updateUserProfile(profile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/user/profile`, profile, { headers: this.getHeaders() });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
  }

  getDashboardData(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard?page=${page}&size=${size}`, { headers: this.getHeaders() });
  }
}
