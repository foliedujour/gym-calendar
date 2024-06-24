import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

export const redirectIfLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.isAdmin()) {
      router.navigate(['/admin/dashboard']);
    } else { 
      router.navigate(['/user/calendar']);
    }
    return false; // Ensure the guard prevents the route activation
  } else {
    return true; // Allow access to the route (e.g., login page)
  }
};
