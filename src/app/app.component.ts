import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * @private
   *
   * Instància del servei d'autenticació.
   * Ho fem anar per obtenir l'estat d'autenticació de l'usuari.
   */
  private authService = inject(AuthService);

  /**
   * @private
   *
   * Instància del router.
   * Utilitzat per gestionar la navegació dins de l'aplicació.
   */
  private router = inject(Router);

  /**
   * @public
   *
   * Computed que determina si s'ha completat la comprovació d'autenticació de l'usuari.
   *
   * @returns {boolean} Retorna `true` si la comprovació d'autenticació ha finalitzat, `false` en cas contrari.
   */
  public finishedAuthCheck = computed<boolean>(() => {
    console.log(this.authService.authStatus());
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  });

  /**
   * @public
   *
   * Efecte que es dispara quan hi ha un canvi en l'estat d'autenticació de l'usuari.
   *
   * Redirigeix l'usuari segons el seu estat d'autenticació actual:
   * - Si l'estat és `checking`, no fa res.
   * - Si l'estat és `authenticated`, redirigeix a `/dashboard`.
   * - Si l'estat és `notAuthenticated`, redirigeix a `/auth/login`.
   */
  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });
}
