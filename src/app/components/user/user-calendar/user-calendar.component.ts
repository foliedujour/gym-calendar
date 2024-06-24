import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { CalendarComponent } from '../../calendar/calendar.component';
import { EventDialogComponent } from '../../event-dialog/event-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookingRequestDto } from 'src/app/shared/interfaces/booking-request';
import { BookingResponse } from 'src/app/shared/interfaces/booking-response';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-calendar',
  standalone: true,
  imports: [CalendarComponent, CommonModule, MatDialogModule, EventDialogComponent],
  templateUrl: './user-calendar.component.html',
  styleUrl: './user-calendar.component.css'
})

export class UserCalendarComponent implements OnInit {
  sessions: any[] = [];
  bookedSessionIds: number[] = [];

  constructor(private eventService: EventService, private dialog: MatDialog, private authService: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadEvents();
    this.cdr.detectChanges();
    this.getUserID();
  }

  
  loadEvents(): void {
    const userId = this.authService.getUserId();
    this.eventService.getCourseSessionsByWeek(new Date().toISOString()).subscribe((events) => {
      this.eventService.getUserCourseSessions(userId).subscribe((bookedSessions) => {
        this.bookedSessionIds = bookedSessions.map((session) => session.id);
        this.sessions = events.map((event) => ({
          ...event,
          isBooked: this.bookedSessionIds.includes(event.id),
        }));
      });
    });
  }

  
  onEventClick(event: any): void {
    console.log("hi");
    this.openEventDialog(event, false, false);
  }

  openEventDialog(event: any, isAdmin: boolean, isMyCalendar: boolean): void {
    console.log('Opening dialog with event:', event); // For debugging
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '400px',
      data: { event, isAdmin, isMyCalendar }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result); // For debugging
      if (result && result.action === 'book') {
        this.bookSession(result.event);
      }
    });
  }
  getUserID(): void{
    console.log(this.authService.getUserId());
  }

  async bookSession(event: any): Promise<void> {
    const bookingRequest: BookingRequestDto = {
      userId: this.authService.getUserId(),
      courseSessionId: event.id
    };

    try {
      const response: BookingResponse = await lastValueFrom(this.eventService.bookSession(bookingRequest));
      if (response.success) {
        console.log('Booking successful');
        console.log(response);
        this.loadEvents();
      } else {
        console.error('Booking failed:', response.message);
        console.log(response);
      }
    } catch (error) {
      console.error('Booking request failed:', error);
    }
  }
  }
 

