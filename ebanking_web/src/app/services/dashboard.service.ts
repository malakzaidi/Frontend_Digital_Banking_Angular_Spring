import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8085/api/dashboard';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
