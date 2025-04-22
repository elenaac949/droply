import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        return true;
      }
      // Redirige a home si ya está autenticado
      return router.createUrlTree(['/home']);
    })
  );
};