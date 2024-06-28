import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap} from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Create an observable to check if the user is authenticated
  private apiURL = `${environment.apiURL}`;
  private jwtHelper = new JwtHelperService(); // Helper service to decode the JWT token in the front-end, too
  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiURL}/login`, { username, password }, { headers }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.isAuthenticatedSubject.next(true); // Update Authentication status based on If user has the token
      })
    );
  }

  getAuthHeaders(): HttpHeaders { // Use headers to send the JWT token to the server
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
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    const roles = decodedToken.roles || [];
    return roles.some((roleArray: any) => 
      roleArray.some((role: any) => role.authority === 'ROLE_ADMIN')
    );
    
  }

  isUser(): boolean {

    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    const roles = decodedToken.roles || [];
    return roles.some((roleArray: any) => 
      roleArray.some((role: any) => role.authority === 'ROLE_USER')
    );
  }

  getUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.userId;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
