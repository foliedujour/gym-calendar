import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateCourseSessionComponent, CreateEventComponent } from './components/admin/create-event/create-event.component';
import { authGuard } from './guards/auth.guard';
import { CreateCourseComponent } from './components/admin/create-course/create-course.component';
import { RegisterInstructorComponent } from './components/admin/register-instructor/register-instructor.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },

    { path: 'welcome', component: WelcomeComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'admin/events/new', component: CreateCourseSessionComponent, canActivate: [authGuard] },
    { path: 'admin/courses/new', component: CreateCourseComponent, canActivate: [authGuard] },
    { path: 'admin/instructors/new', component: RegisterInstructorComponent, canActivate: [authGuard] }
];
export const appRouterProviders = RouterModule.forRoot(routes);

