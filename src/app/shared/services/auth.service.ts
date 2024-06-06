import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = `${environment.apiURL}`;
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
    console.log(headers);
    return this.http.get(`${this.apiURL}/welcome`, { headers, responseType: 'text' });
  }
}
