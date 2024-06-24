import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service'

export const userAuthGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isAuthenticated() && authService.isUser()) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { message: 'Please log in to continue' }});
    return false;
  }

};
