import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { CalendarComponent } from '../../calendar/calendar.component';
import { EventDialogComponent } from '../../event-dialog/event-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { GoBackButtonComponent } from '../../go-back-button/go-back-button.component';

@Component({
  selector: 'app-admin-calendar',
  standalone: true,
  imports: [CalendarComponent, CommonModule, MatDialogModule, EventDialogComponent, GoBackButtonComponent],
  templateUrl: './admin-calendar.component.html',
  styleUrl: './admin-calendar.component.css'
})
export class AdminCalendarComponent implements OnInit {
  sessions: any[] = [];
  

  constructor(private eventService: EventService, private dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.loadEvents();
  } 

  loadEvents(): void {
    this.eventService.getCourseSessionsByWeek(new Date().toISOString()).subscribe(events => {
      this.sessions = events;
    });
  }

  onEventClick(event: any): void {
    this.openEventDialog(event, true);
  }

  openEventDialog(event: any, isAdmin: boolean): void {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      width: '400px',
      data: { event, isAdmin }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'delete') {
          this.deleteSession(result.event);
       }
    });
  }

  deleteSession(event: any): void {
    this.eventService.deleteCourseSession(event.id).subscribe(() => {
      this.loadEvents();
    });
  }
}
