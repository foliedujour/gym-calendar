import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Course } from '../interfaces/course';
import { Instructor } from '../interfaces/instructor';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  http: HttpClient = inject(HttpClient);
   constructor(private authService: AuthService) { }
  private apiUrL = `${environment.apiURL}/api/courses`;

  getCourses(): Observable<Course[]> {
    
    return this.http.get<any[]>(`${this.apiUrL}`, { headers: this.authService.getAuthHeaders()  });
    
  
  }

  getInstructorsForCourse(courseId: number): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.apiUrL}/${courseId}/instructors`, { headers: this.authService.getAuthHeaders()  });
  }
}




