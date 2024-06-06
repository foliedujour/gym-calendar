import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CalendarComponent } from './components/calendar/calendar.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent},
    // { path: '**', redirectTo: 'login', pathMatch: 'full' }
    { path: 'welcome', component: WelcomeComponent },
    { path: 'calendar', component: CalendarComponent },
];
export const appRouterProviders = RouterModule.forRoot(routes);