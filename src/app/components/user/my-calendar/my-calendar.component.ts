import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../calendar/calendar.component';
import { EventService } from 'src/app/shared/services/event.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EventDialogComponent } from '../../event-dialog/event-dialog.component';
import { CourseSession } from 'src/app/shared/interfaces/course-session';


@Component({
  selector: 'app-my-calendar',
  standalone: true,
  imports: [CalendarComponent, CommonModule, MatDialogModule, EventDialogComponent],
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.css'
})
export class MyCalendarComponent implements OnInit {
  sessions: CourseSession[] = [];
  title: string = 'MyCalendar!!';

  constructor(private eventService: EventService, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUserSessions();

  }

  loadUserSessions(): void {
    const userId = this.authService.getUserId();
    if (userId === null) {
      console.error('User not authenticated');
      return;
    }

    this.eventService.getUserCourseSessions(userId).subscribe({
      next: (sessions: CourseSession[]) => {
        this.sessions = sessions;
      },
      error: (error) => {
        console.error('Failed to load user sessions:', error);
      }
    });
  }

  openEventDialog(session: any): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '400px',
      data: { event: session, isAdmin: false, isMyCalendar: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'unbook') {
        this.unbookSession(result.event.id);
      }
    });
  }

  unbookSession(sessionId: number): void {
    // this.authService.unbook(sessionId).subscribe(() => {
    //   this.loadUserSessions(); // Refresh events after unbooking
    // });
  }
  
}
