import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { CourseSession } from '../interfaces/course-session';
import { BookingRequestDto } from '../interfaces/booking-request';
import { BookingResponse } from '../interfaces/booking-response';


@Injectable({
  providedIn: 'root'
})
export class EventService {

   http: HttpClient = inject(HttpClient);

   constructor(private authService: AuthService) { }

   private apiURL = `${environment.apiURL}`

   getCourseSessionsByWeek(startDate: string): Observable<CourseSession[]> {
    return this.http.get<CourseSession[]>(`${this.apiURL}/api/course-sessions/week?date=${startDate}`, { headers: this.authService.getAuthHeaders() });
  }

  getUserCourseSessions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/api/user/course-sessions?userId=${userId}`, { headers: this.authService.getAuthHeaders() });
  }

  isBooked(userId: number, sessionId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiURL}/api/bookings/isBooked?userId=${userId}&sessionId=${sessionId}`);
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

  deleteCourseSession(sessionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/api/admin/course-sessions/${sessionId}`, { headers: this.authService.getAuthHeaders() });
  }

  bookSession(bookingRequest: BookingRequestDto): Observable<BookingResponse> {
    return this.http.post<BookingResponse>(`${this.apiURL}/api/user/bookings`, bookingRequest, { headers: this.authService.getAuthHeaders() });
  }

  unBookSession(bookingRequest: BookingRequestDto): Observable<BookingResponse> {
    return this.http.delete<BookingResponse>(`${this.apiURL}/api/user/bookings`,  { headers: this.authService.getAuthHeaders(), body: bookingRequest }, );
  }

 
  formatDateToISO(date) {  // Format date so it can be used by getCourseSessionsByWeek
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}

  


