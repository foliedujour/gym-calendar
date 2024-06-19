import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Course } from '../interfaces/course';
import { Instructor } from '../interfaces/instructor';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  http: HttpClient = inject(HttpClient);
   constructor(private authService: AuthService) { }
  private apiUrL = `${environment.apiURL}`;

  getCourses(): Observable<Course[]> {
    return this.http.get<any[]>(`${this.apiUrL}/api/courses`, { headers: this.authService.getAuthHeaders()  });
  }

  getInstructorsForCourse(courseId: number): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.apiUrL}/api/courses/${courseId}/instructors`, { headers: this.authService.getAuthHeaders()  });
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.apiUrL}/api/admin/courses`, course, { headers: this.authService.getAuthHeaders() });
  }

}




