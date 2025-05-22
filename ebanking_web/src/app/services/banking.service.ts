import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BankingService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getUserAccounts(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/accounts`, { headers });
  }

  payBill(data: { accountId: string, billerName: string, amount: number, userId: string }): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/bills/pay`, data, { headers });
  }

  getTransactionHistory(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/transactions/history`, { headers });
  }

  // Example: Add userId to existing methods
  createAccount(accountData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = { ...accountData, userId: this.getUserId() };
    return this.http.post(`${this.apiUrl}/accounts`, data, { headers });
  }

  createTransaction(transactionData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = { ...transactionData, userId: this.getUserId() };
    return this.http.post(`${this.apiUrl}/transactions`, data, { headers });
  }

  createTransfer(transferData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = { ...transferData, userId: this.getUserId() };
    return this.http.post(`${this.apiUrl}/transfers`, data, { headers });
  }

  createCustomer(customerData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const data = { ...customerData, userId: this.getUserId() };
    return this.http.post(`${this.apiUrl}/customers`, data, { headers });
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
