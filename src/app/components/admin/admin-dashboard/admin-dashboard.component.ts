import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '../../calendar/calendar.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CreateCourseSessionComponent} from '../create-event/create-event.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CalendarComponent, WelcomeComponent, RouterLink, RouterOutlet, CreateCourseSessionComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  navigateToCreateEvent(): void {
    
 this.router.navigate(['/admin/events/new']);
    
  }
  
  navigateToCreateCourse(): void {
    this.router.navigate(['/admin/courses/new']);
  }

  navigateToRegisterInstructor(): void {
    this.router.navigate(['/admin/instructors/new']);
  }

  navigateToAdminCalendar(): void {
    this.router.navigate(['/admin/calendar']);
  }
}

