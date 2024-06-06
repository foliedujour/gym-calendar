import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { MenuComponent } from './components/menu/menu.component';
import { AuthService } from './shared/services/auth.service';
import { WelcomeComponent } from './components/welcome/welcome.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent, HttpClientModule, LoginComponent, RouterLink, RouterOutlet, SlideshowComponent, MenuComponent, WelcomeComponent, ],
  templateUrl: './app.component.html',
  providers: [CalendarComponent, HttpClientModule, SlideshowComponent, LoginComponent],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewDate: Date = new Date();
  events: [];
}