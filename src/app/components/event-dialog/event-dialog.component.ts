import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EventService } from 'src/app/shared/services/event.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseSession } from 'src/app/shared/interfaces/course-session';

@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogContent,
    CommonModule,
    MatDialogActions
  ],
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  isAdmin: boolean;
  isMyCalendar: boolean;
  event: CourseSession;
  isBooked: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService,
    private authService: AuthService
  ) {
    this.isAdmin = data.isAdmin;
    this.isMyCalendar = data.isMyCalendar;
    this.event = data.event
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.eventService.isBooked(userId, this.event.id).subscribe((isBooked: boolean) => {
      this.isBooked = isBooked;
    });
  }
  formatTime(dateTime: string): string {
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  onDelete(): void {
    this.dialogRef.close({ event: this.data.event, action: 'delete' });
  }

  onCancel(): void {
    this.dialogRef.close({ action: 'cancel' });
  }

  onBook(): void {
    this.dialogRef.close({ event: this.data.event, action: 'book' });
  }

  onUnbook(): void {
    this.dialogRef.close({ event: this.data.event, action: 'unbook' });
  }
}
