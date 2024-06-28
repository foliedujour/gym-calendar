import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { MenuComponent } from './components/menu/menu.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthService } from './shared/services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalendarComponent, HttpClientModule, LoginComponent, RouterLink, RouterOutlet, SlideshowComponent, MenuComponent, WelcomeComponent ],
  templateUrl: './app.component.html',
  providers: [],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  isAuthenticated: boolean = false;
  
  constructor(private router: Router, private authService: AuthService, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.scrollToSection();
    this.checkAuthStatus();
  }
  
  checkAuthStatus() {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => { // Subscribe to the isAuthenticated$ observable to get the latest authentication status
      this.isAuthenticated = isAuthenticated;
      this.cdr.detectChanges();
    });
  }

  handleAuthAction() {
    if (this.isAuthenticated) { // If the user is authenticated, the option is to log out
      this.authService.logout();
      this.isAuthenticated = false;
      this.cdr.detectChanges();
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
    this.scrollToSection();
  }
  
  scrollToSection() {
    // Scroll to the content section after the page is loaded
    setTimeout(() => {
      const element = document.getElementById('content-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Adjust timeout as needed
  }

  navigateToDashboard() {
    if (this.isAuthenticated) {
      if (this.authService.isAdmin()) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/user/dashboard']);
      }
    } else {
      this.router.navigate(['/login'], { queryParams: { message: 'Please login to access the dashboard' } });
      
    }
    this.scrollToSection();
  }
  
  navigateToCalendar() {
    if (this.isAuthenticated) {
     if (this.authService.isAdmin()) {
        this.router.navigate(['/admin/calendar']);
      } else {
        this.router.navigate(['/user/calendar']);
      }
    } else {
      this.router.navigate(['/calendar']);
    }
    this.scrollToSection();
  }
 
}
