import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers`);
  }

  searchCustomers(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customers/search?keyword=${keyword}`);
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers`, customer);
  }

  getAccountDetails(accountId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bankAccounts/${accountId}`);
  }

  getAccountOperations(accountId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bankAccounts/${accountId}/operations`);
  }

  debit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/bankAccounts/debit`, { accountId, amount, description });
  }

  credit(accountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/bankAccounts/credit`, { accountId, amount, description });
  }

  transfer(fromAccountId: string, toAccountId: string, amount: number, description: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/bankAccounts/transfer`, { fromAccountId, toAccountId, amount, description });
  }
}
