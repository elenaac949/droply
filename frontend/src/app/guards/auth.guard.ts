import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, Observable, take } from 'rxjs';

/**
 * Guardia de ruta para proteger rutas que requieren autenticación
 * 
 * @returns 
 * - `true` si el usuario está autenticado y puede acceder a la ruta
 * - `UrlTree` para redirigir al login si no está autenticado
 */
export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }
      // Redirige a login con returnUrl
      return router.createUrlTree(['/login'], { 
        queryParams: { returnUrl: state.url } 
      });
    })
  );
};