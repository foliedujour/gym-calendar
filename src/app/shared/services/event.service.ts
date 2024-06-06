import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {

   http: HttpClient = inject(HttpClient);

   constructor(private authService: AuthService) { }

   private apiURL = `${environment.apiURL}/course-sessions`

   getCourseSessionsByWeek(startDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/week?date=${startDate}`, { headers: this.authService.getAuthHeaders() });
  }
}

