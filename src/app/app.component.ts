import { Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { MenuComponent } from './components/menu/menu.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent, HttpClientModule, LoginComponent, RouterLink, RouterOutlet, SlideshowComponent, MenuComponent, WelcomeComponent, HeaderComponent ],
  templateUrl: './app.component.html',
  providers: [],
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  scrollToSection() {
    // Give some time for navigation to complete before scrolling
    setTimeout(() => {
      const element = document.getElementById('content-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Adjust timeout as needed
  }
  
 
}
