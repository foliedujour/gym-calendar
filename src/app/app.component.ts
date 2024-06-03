import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent, HttpClientModule, LoginComponent, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  providers: [CalendarComponent, HttpClientModule],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewDate: Date = new Date();
  events: [];
}