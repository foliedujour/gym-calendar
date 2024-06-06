import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service'; // Adjust the import path accordingly
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  days = [];
  timeSlots = ['ΠΡΩΙ', 'ΑΠΟΓΕΥΜΑ', 'ΒΡΑΔΥ'];

  sessions: any[] = [];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.initializeDays();
    this.loadSessions();
  }

  initializeDays(): void {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    const monday = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))); // Get Monday

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      this.days.push({ name: this.getDayName(date), date: date });
    }
  }

  getDayName(date: Date): string {
    return date.toLocaleDateString('el-GR', { weekday: 'long' }).toUpperCase();
  }

  loadSessions(): void {
    this.eventService.getCourseSessionsByWeek(new Date().toISOString()).subscribe(sessions => {
      this.sessions = sessions;
      console.log(this.sessions);
    });
  }

  getSessions(day: string, timeSlot: string): any[] {
    return this.sessions.filter(session => {
      const sessionDay = new Date(session.startDateTime).toLocaleDateString('el-GR', { weekday: 'long' }).toUpperCase();
      const sessionHour = new Date(session.startDateTime).getHours();

      let timeSlotMatch = false;
      if (timeSlot === 'ΠΡΩΙ' && sessionHour >= 6 && sessionHour < 12) {
        timeSlotMatch = true;
      } else if (timeSlot === 'ΑΠΟΓΕΥΜΑ' && sessionHour >= 12 && sessionHour < 18) {
        timeSlotMatch = true;
      } else if (timeSlot === 'ΒΡΑΔΥ' && sessionHour >= 18 && sessionHour < 24) {
        timeSlotMatch = true;
      }

      return sessionDay === day && timeSlotMatch;
    });
  }
}
