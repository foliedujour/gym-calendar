import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instructor } from '../interfaces/instructor';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  private apiUrl = `${environment.apiURL}`; 

  constructor(private http: HttpClient, private auth: AuthService) { }

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<any>(`${this.apiUrl}/api/instructors`, { headers: this.auth.getAuthHeaders() });
  }

  registerInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(`${this.apiUrl}/api/admin/instructors`, instructor, { headers: this.auth.getAuthHeaders() });
  }
}
