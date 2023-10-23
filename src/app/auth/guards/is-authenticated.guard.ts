import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

/**
 * @const isAuthenticatedGuard
 *
 * Guard que s'encarrega de determinar si l'usuari està autenticat per accedir a una ruta determinada.
 *
 * @type {CanActivateFn}
 * @param {ActivatedRouteSnapshot} route - La ruta activa que s'està intentant accedir.
 * @param {RouterStateSnapshot} state - L'estat actual del router.
 *
 * @returns {boolean} Retorna `true` si l'usuari està autenticat, altrament redirigeix a la pàgina de login i retorna `false`.
 */

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  /**
   * @const authService
   *
   * Instància del servei d'autenticació.
   */
  const authService = inject(AuthService);

  /**
   * @const router
   *
   * Instància del servei de router.
   */
  const router = inject(Router);

  /**
   * Comprova si l'estat d'autenticació és 'authenticated'.
   */
  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }

  /**
   * Redirigeix a la pàgina de login si l'usuari no està autenticat.
   */
  router.navigateByUrl('/auth/login');

  return false;
};
