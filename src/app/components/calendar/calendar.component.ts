import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarView, CalendarEvent, CalendarModule } from 'angular-calendar';
import { startOfWeek } from 'date-fns';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  CalendarView = CalendarView;
  ngOnInit(): void {
    this.loadEvents();
    console.log('Events:', this.events); // Debug log to check events (empty array
  }
  constructor(private eventService: EventService) {
  }

  loadEvents(): void {
    const startDate = this.viewDate.toISOString();
    console.log('Start Date:', startDate); // Debug log to check start date
    this.eventService.getCourseSessionsByWeek(startDate).subscribe(events => {
      console.log('API Response:', events); // Debug log to check the response
      this.events = this.mapToCalendarEvents(events);
      console.log('Mapped Events:', this.events); // Debug log to check mapped events
    });
  }

  mapToCalendarEvents(events: any[]): CalendarEvent[] {
    return events.map(event => ({
      start: new Date(event.startDateTime),
      end: new Date(event.endDateTime),
      title: `${ event.course.title } with ${ event.instructor.firstName }`,
      description: event.course.description,
      color: {
        primary: event.colorPrimary || '#ad2121',
        secondary: event.colorSecondary || '#FAE3E3'
      },
      meta: {
        id: event.id
      }
    }));
  }

  setView(view: CalendarView) {
    this.view = view;
  }


}