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
  imageUrl: string;

  courseTitleToImageUrl: { [key: string]: string } = { // array of image links to decorate eache course
    'Yoga Class' : '../../../assets/yoga.jpg',
    'Pilates': '../../../assets/pilates.jpg',
    'Strength Training': '../../../assets/strength-training.jpg',
  }

  defaultImageUrl = '../../../assets/default.jpg'; // default image link if course has not its own image

  constructor(
    public dialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService,
    private authService: AuthService
  ) {
    this.isAdmin = data.isAdmin;
    this.event = data.event
    this.imageUrl = this.getImageUrl(this.data.event.courseTitle);
  }

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    this.eventService.isBooked(userId, this.event.id).subscribe((isBooked: boolean) => {
      this.isBooked = isBooked; // Checks if user has booked the emitted event
    });
  }

  formatTime(dateTime: string): string { // Format time to HH:MM for more user-friendly display
    const date = new Date(dateTime);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  isEventInPast(): boolean { // Checks if event is in the past in order to disable book option
    const eventDate = new Date(this.data.event.startDateTime); 
    const currentDate = new Date();
    return eventDate < currentDate;
  }

  getImageUrl(courseTitle: string): string {
    return this.courseTitleToImageUrl[courseTitle] || this.defaultImageUrl;
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
