import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent},
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
export const appRouterProviders = RouterModule.forRoot(routes);