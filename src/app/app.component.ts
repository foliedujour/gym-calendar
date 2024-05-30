import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent, HttpClientModule],
  template: `<app-calendar></app-calendar>`,
  providers: [CalendarComponent, HttpClientModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewDate: Date = new Date();
  events: [];
}