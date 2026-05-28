import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const rolesRequeridos: string[] = route.data['roles'] || [];
  const rolesUsuario = auth.getRoles();

  const tieneAcceso = rolesRequeridos.some(r => rolesUsuario.includes(r));

  return tieneAcceso ? true : router.createUrlTree(['/torneos']);
};
