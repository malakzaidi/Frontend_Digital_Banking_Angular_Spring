import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { BankAccountDTO, CurrentBankAccountDTO, SavingBankAccountDTO, CustomerDTO, AccountHistoryDTO, CreditDTO, DebitDTO, TransferRequestDTO, TransactionHistoryDTO } from '../banking-dtos';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getBankAccounts(page: number, size: number): Observable<{ accounts: BankAccountDTO[], total: number }> {
    return this.http.get<{ accounts: BankAccountDTO[], total: number }>(`${this.apiUrl}/accounts?page=${page}&size=${size}`);
  }

  searchBankAccounts(keyword: string, page: number, size: number): Observable<{ accounts: BankAccountDTO[], total: number }> {
    return this.http.get<{ accounts: BankAccountDTO[], total: number }>(`${this.apiUrl}/accounts/search?keyword=${keyword}&page=${page}&size=${size}`);
  }

  saveCurrentBankAccount(initialBalance: number, overDraft: number, customerId: number): Observable<CurrentBankAccountDTO> {
    return this.http.post<CurrentBankAccountDTO>(`${this.apiUrl}/accounts/current`, { initialBalance, overDraft, customerId });
  }

  saveSavingBankAccount(initialBalance: number, interestRate: number, customerId: number): Observable<SavingBankAccountDTO> {
    return this.http.post<SavingBankAccountDTO>(`${this.apiUrl}/accounts/saving`, { initialBalance, interestRate, customerId });
  }

  getCustomers(): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers`);
  }

  getUserAccounts(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${this.apiUrl}/accounts/user`);
  }

  getPagedAccountHistory(accountId: string, page: number, size: number): Observable<AccountHistoryDTO> {
    return this.http.get<AccountHistoryDTO>(`${this.apiUrl}/accounts/${accountId}/history?page=${page}&size=${size}`);
  }

  searchCustomers(keyword: string): Observable<CustomerDTO[]> {
    return this.http.get<CustomerDTO[]>(`${this.apiUrl}/customers/search?keyword=${keyword}`);
  }

  getCustomer(id: number): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(`${this.apiUrl}/customers/${id}`);
  }

  saveCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.post<CustomerDTO>(`${this.apiUrl}/customers`, customer);
  }

  updateCustomer(customer: CustomerDTO): Observable<CustomerDTO> {
    return this.http.put<CustomerDTO>(`${this.apiUrl}/customers/${customer.id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/customers/${id}`);
  }

  payBill(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/bills/pay`, body);
  }

  credit(credit: CreditDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/credit`, credit);
  }

  debit(debit: DebitDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/debit`, debit);
  }

  getTransactionHistory(): Observable<TransactionHistoryDTO[]> {
    return this.http.get<TransactionHistoryDTO[]>(`${this.apiUrl}/transactions/history`);
  }

  transfer(transfer: TransferRequestDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/accounts/transfer`, transfer);
  }

  deleteBankAccount(accountId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/accounts/${accountId}`);
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
  }
}
