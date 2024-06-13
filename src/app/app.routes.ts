import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateCourseSessionComponent, CreateEventComponent } from './components/admin/create-event/create-event.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent},
    // { path: '**', redirectTo: 'login', pathMatch: 'full' }
    { path: 'welcome', component: WelcomeComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'create-event', component: CreateCourseSessionComponent },
];
export const appRouterProviders = RouterModule.forRoot(routes);

