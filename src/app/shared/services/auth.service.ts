import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = `${environment.apiURL}`;
  private jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiURL}/login`, { username, password }, { headers });
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getWelcomeMessage(): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiURL}/welcome`, { headers, responseType: 'text' });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Check if token exists
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'ROLE_ADMIN'; // Check if the role is admin
  }
}
