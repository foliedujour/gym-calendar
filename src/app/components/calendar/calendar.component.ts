import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() isMyCalendar: boolean = false;
  constructor(private eventService: EventService, private authService: AuthService) { }


  ngOnInit(): void {
    this.initializeDays();
    this.loadSessions();
  }

  initializeDays(): void {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const monday = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))); // Monday
    this.currentMonday = monday;
    this.generateWeekDays(monday);
  }

  generateWeekDays(startDate: Date): void {
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
    if (this.isMyCalendar) {
      this.loadUserSessions();
    } else {
      const startOfWeekISO = this.currentMonday.toISOString();
      this.eventService.getCourseSessionsByWeek(startOfWeekISO).subscribe(sessions => {
        this.sessions = sessions;
    });
  }
}

loadUserSessions(): void {
  const userId = this.authService.getUserId();
  if (userId === null) {
    return;
  }

  const startOfWeek = this.currentMonday.toISOString();
  this.eventService.getUserCourseSessions(userId).subscribe({
    next: (sessions: CourseSession[]) => {
      // Filter sessions for the current week
      const endOfWeek = new Date(this.currentMonday);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      const startOfWeekTime = this.currentMonday.getTime();
      const endOfWeekTime = endOfWeek.getTime();

      this.sessions = sessions.filter(session => {
        const sessionTime = new Date(session.startDateTime).getTime();
        return sessionTime >= startOfWeekTime && sessionTime <= endOfWeekTime;
      });
    },
    error: (error) => {
      
    }
  });
}

  getSessions(day: string, timeSlot: string): any[] {

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

      return filteredSessions.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());
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
    this.loadSessions();
  }

  goToNextWeek(event: Event): void {
    event.preventDefault();
    const nextMonday = new Date(this.currentMonday);
    nextMonday.setDate(this.currentMonday.getDate() + 7);
    this.currentMonday = nextMonday;
    this.generateWeekDays(nextMonday);
    this.loadSessions();
  }

  goToCurrentWeek(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const monday = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))); // Monday
    this.currentMonday = monday;
    this.generateWeekDays(monday);
    this.loadSessions();
  }

  onSessionClicked(session: any): void {
    console.log('Session clicked:', session); 
    this.sessionClicked.emit(session);
  }
}