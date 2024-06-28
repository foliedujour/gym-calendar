import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service'; 
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CourseSession } from 'src/app/shared/interfaces/course-session';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() title: string = 'ΠΡΟΓΡΑΜΜΑ ΕΒΔΟΜΑΔΑΣ';
  days: { name: string, date: Date }[] = [];
  timeSlots = ['ΠΡΩΙ', 'ΑΠΟΓΕΥΜΑ', 'ΒΡΑΔΥ'];
  @Input() sessions: CourseSession[] = [];
  @Output() sessionClicked = new EventEmitter<any>();
  currentMonday: Date;
  @Output() weekChanged = new EventEmitter<Date>();

 
  constructor(private eventService: EventService, private authService: AuthService, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.initializeDays();
    this.loadSessions();
  }

  initializeDays(): void { // Initialize days and get Monday to work with next and prev functions
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const monday = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))); 
    this.currentMonday = monday;
    console.log('currentMonday:', this.currentMonday)
    this.generateWeekDays(monday);
  }

  generateWeekDays(startDate: Date): void { // Generate days of the week to populate the calendar table
    this.days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      this.days.push({ name: this.getDayName(date), date: date });
    }
  }

  getDayName(date: Date): string {
    return date.toLocaleDateString('el-GR', { weekday: 'long' }).toUpperCase();
  }

  loadSessions(): void {
   // Load sessions always based on Monday in order for next prev functions to work properly
    const startOfWeekISO = this.eventService.formatDateToISO(this.currentMonday)
    console.log('startOfWeekISO:', startOfWeekISO)
    this.eventService.getCourseSessionsByWeek(startOfWeekISO).subscribe(sessions => {
      this.sessions = sessions;
    });
  }

  getSessions(day: string, timeSlot: string): any[] { // Filter sessions based on day and time slot to fit the calendar properly

    try {
      const filteredSessions = this.sessions.filter(session => {
        const sessionDate = new Date(session.startDateTime);
        const sessionDay = sessionDate.toLocaleDateString('el-GR', { weekday: 'long' }).toUpperCase();
        const sessionHour = sessionDate.getHours();

        let timeSlotMatch = false;
        if (timeSlot === 'ΠΡΩΙ' && sessionHour >= 8 && sessionHour < 12) {
          timeSlotMatch = true;
        } else if (timeSlot === 'ΑΠΟΓΕΥΜΑ' && sessionHour >= 12 && sessionHour < 18) {
          timeSlotMatch = true;
        } else if (timeSlot === 'ΒΡΑΔΥ' && sessionHour >= 18 && sessionHour <= 21) {
          timeSlotMatch = true;
        }

        return sessionDay === day && timeSlotMatch;
      });

      return filteredSessions.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime()); // Sorts sessions one more time by startDateTime in ascending order for display purposes
    } catch (error) {

      return [];
    }
  }

  goToPreviousWeek(event: Event): void {
    event.preventDefault();
    const previousMonday = new Date(this.currentMonday);
    previousMonday.setDate(this.currentMonday.getDate() - 7);
    this.currentMonday = previousMonday;
    this.generateWeekDays(previousMonday);
    this.weekChanged.emit(this.currentMonday); // Emit week change event in order for user-calendar to also update its week and access the correct sessions
    this.loadSessions(); 
  }

  goToNextWeek(event: Event): void {
    event.preventDefault();
    const nextMonday = new Date(this.currentMonday);
    nextMonday.setDate(this.currentMonday.getDate() + 7);
    this.currentMonday = nextMonday;
    this.generateWeekDays(nextMonday);
    this.weekChanged.emit(this.currentMonday); // Emit week change event in order for user-calendar to also update its week and access the correct sessions
    this.loadSessions(); 
  }

  goToCurrentWeek(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior of Angular
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const monday = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))); // Monday
    this.currentMonday = monday;
    this.generateWeekDays(monday);
    this.weekChanged.emit(this.currentMonday); // Emit week change event
    this.loadSessions(); 
  }
  onSessionClicked(session: any): void { 
    this.sessionClicked.emit(session); // Emit the session to user-calendar and admin-calendar component
  }

}