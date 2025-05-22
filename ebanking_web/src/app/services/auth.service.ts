import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: { usernameOrEmail: string; password: string }): Observable<any> {
    const body = {
      usernameOrEmail: credentials.usernameOrEmail,
      password: credentials.password
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/auth/login`, body, { headers });
  }

  register(user: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    roles?: string[];
  }): Observable<any> {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      roles: user.roles || ['USER']
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/auth/register`, body, { headers });
  }

  changePassword(data: { currentPassword: string; newPassword: string }, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/auth/change-password`, data, { headers });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('token') : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = this.decodeToken();
      if (!payload || !payload.exp) return false;
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }

  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  }

  getCurrentUser(): any {
    const payload = this.decodeToken();
    return payload ? { username: payload.sub, roles: payload.roles || [], exp: payload.exp } : null;
  }

  isTokenExpired(exp: number): boolean {
    return Date.now() >= exp * 1000;
  }
}
