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

   private apiURL = `${environment.apiURL}/api/course-sessions`

   getCourseSessionsByWeek(startDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/week?date=${startDate}`, { headers: this.authService.getAuthHeaders() });
  }

  checkInstructorAvailability(instructorId: number, startDateTime: string, endDateTime: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/check-instructor-availability`, {
      params: {
        'instructorId': instructorId.toString(),
        'startDateTime': startDateTime,
        'endDateTime': endDateTime
      },
      headers: this.authService.getAuthHeaders()
    });
  }

  checkClassRoomAvailability(roomId: number, startDateTime: string, endDateTime: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/check-room-availability`, {
      params: {
        'roomId': roomId.toString(),
        'startDateTime': startDateTime,
        'endDateTime': endDateTime
      },
      headers: this.authService.getAuthHeaders()
    });
  }
}

  


