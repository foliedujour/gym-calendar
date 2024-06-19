import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CourseSession } from '../interfaces/course-session';


@Injectable({
  providedIn: 'root'
})
export class EventService {

   http: HttpClient = inject(HttpClient);

   constructor(private authService: AuthService) { }

   private apiURL = `${environment.apiURL}`

   getCourseSessionsByWeek(startDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/course-sessions/week?date=${startDate}`, { headers: this.authService.getAuthHeaders() });
  }

  checkInstructorAvailability(instructorId: number, startDateTime: string, endDateTime: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/api/course-sessions/check-instructor-availability`, {
      params: {
        'instructorId': instructorId.toString(),
        'startDateTime': startDateTime,
        'endDateTime': endDateTime
      },
      headers: this.authService.getAuthHeaders()
    });
  }

  checkClassRoomAvailability(roomId: number, startDateTime: string, endDateTime: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/api/course-sessions/check-room-availability`, {
      params: {
        'roomId': roomId.toString(),
        'startDateTime': startDateTime,
        'endDateTime': endDateTime
      },
      headers: this.authService.getAuthHeaders()
    });
  }

  createCourseSession(session: CourseSession): Observable<CourseSession> {
    const headers = this.authService.getAuthHeaders();
    return this.http.post<CourseSession>(`${this.apiURL}/api/admin/course-sessions`, session, { headers });
  }
}

  


