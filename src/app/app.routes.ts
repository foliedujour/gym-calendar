import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateCourseSessionComponent, CreateEventComponent } from './components/admin/create-event/create-event.component';
import { adminAuthGuard } from './guards/admin.auth.guard';
import { CreateCourseComponent } from './components/admin/create-course/create-course.component';
import { RegisterInstructorComponent } from './components/admin/register-instructor/register-instructor.component';
import { AdminCalendarComponent } from './components/admin/admin-calendar/admin-calendar.component';
import { UserCalendarComponent } from './components/user/user-calendar/user-calendar.component';
import { userAuthGuardGuard } from './guards/user.auth.guard';
import { MyCalendarComponent } from './components/user/my-calendar/my-calendar.component';
import { redirectIfLoggedInGuard } from './guards/redirect-if-logged-in.guard';
import { HomePageContentComponent } from './components/home-page-content/home-page-content.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [redirectIfLoggedInGuard] },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [adminAuthGuard] },
    { path: 'user/dashboard', component: UserDashboardComponent, canActivate: [userAuthGuardGuard]},
    { path: '', component: HomePageContentComponent},
    { path: 'welcome', component: WelcomeComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'admin/events/new', component: CreateCourseSessionComponent, canActivate: [adminAuthGuard] },
    { path: 'admin/courses/new', component: CreateCourseComponent, canActivate: [adminAuthGuard] },
    { path: 'admin/instructors/new', component: RegisterInstructorComponent, canActivate: [adminAuthGuard] },
    { path: 'admin/calendar', component: AdminCalendarComponent, canActivate: [adminAuthGuard] },
    { path: 'user/calendar', component: UserCalendarComponent, canActivate: [userAuthGuardGuard] },
    { path: 'my-calendar', component: MyCalendarComponent, canActivate: [userAuthGuardGuard] },
];
export const appRouterProviders = RouterModule.forRoot(routes);

