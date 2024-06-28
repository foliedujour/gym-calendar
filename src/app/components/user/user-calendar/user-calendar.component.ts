import { ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { CalendarComponent } from '../../calendar/calendar.component';
import { EventDialogComponent } from '../../event-dialog/event-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BookingRequestDto } from 'src/app/shared/interfaces/booking-request';
import { BookingResponse } from 'src/app/shared/interfaces/booking-response';
import { lastValueFrom } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { format } from 'date-fns';

@Component({
  selector: 'app-user-calendar',
  standalone: true,
  imports: [CalendarComponent, CommonModule, MatDialogModule, EventDialogComponent, ConfirmationDialogComponent, MatSnackBarModule],
  templateUrl: './user-calendar.component.html',
  styleUrl: './user-calendar.component.css'
})

export class UserCalendarComponent implements OnInit {
  sessions: any[] = [];
  bookedSessionIds: number[] = [];
  @Input() currentMonday!: Date;

  constructor(private eventService: EventService, private dialog: MatDialog, private authService: AuthService, private cdr: ChangeDetectorRef, 
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (!this.currentMonday) {
      this.initializeCurrentMonday();
    }
    this.loadEvents();
    this.getUserID();
  }


  initializeCurrentMonday(): void {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    this.currentMonday = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))); // Set to Monday
  }

  
  loadEvents(): void { // get all course sessions for the current week
    // then filter them based on if the user has booked
    // a class based on booked status has been applied to the parent component
    // that emits the sessions
    const userId = this.authService.getUserId();
    const startOfWeekISO = this.eventService.formatDateToISO(this.currentMonday);
    this.eventService.getCourseSessionsByWeek(startOfWeekISO).subscribe((events) => {
      this.eventService.getUserCourseSessions(userId).subscribe((bookedSessions) => {
        this.bookedSessionIds = bookedSessions.map((session) => session.id);
        this.sessions = events.map((event) => ({
          ...event,
          isBooked: this.bookedSessionIds.includes(event.id), // Add isBooked property to each event, specifically for this component
        }));
        this.cdr.markForCheck();
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
      } else if (result && result.action === 'unbook') {
        this.confirmUnbookSession(result.event);
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
        this.snackBar.open('Booking successful', 'Close', { duration: 3000 }); // Display success message to the user
        this.loadEvents();
      } else {
        console.error('Booking failed:', response.message);
        this.snackBar.open('Booking failed: ' + response.message, 'Close', { duration: 3000 }); // Display error message to the user
        console.log(response);
      }
    } catch (error) {
      console.error('Booking request failed:', error);
      this.snackBar.open('Booking request failed: ' + error.message, 'Close', { duration: 3000 });
    }
  }

  async unbookSession(event: any): Promise<void> {
    const bookingRequest: BookingRequestDto = {
      userId: this.authService.getUserId(),
      courseSessionId: event.id
    };

    try {
      const response: BookingResponse = await lastValueFrom(this.eventService.unBookSession(bookingRequest));
      if (response.success) {
        this.snackBar.open('Unbooking successful', 'Close', { duration: 3000 }); // Display success message to the user
        this.loadEvents();
      } else {
        this.snackBar.open('Error occured', 'Close', { duration: 3000 }); // Display failure message to the user
        console.log(response);
      }
    } catch (error) {
      console.error('Unbooking request failed:', error);
    }
  }

  confirmUnbookSession(event: any): void { // Confirm unbooking with a dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.unbookSession(event);
      }
    });
  }
  }
 



