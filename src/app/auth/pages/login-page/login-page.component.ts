import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

/**
 * Component de la pàgina de login.
 *
 *
 */

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  /**
   * @private fb
   *
   * Instància del FormBuilder per a la creació del formulari reactiu.
   */
  private fb = inject(FormBuilder);

  /**
   * @private authService
   *
   * Instància del servei d'autenticació per gestionar l'accés de l'usuari.
   */
  private authService = inject(AuthService);

  /**
   * @private router
   *
   * Instància del Router per redirigir l'usuari a altres pàgines.
   */
  private router = inject(Router);

  /**
   * @public myForm
   *
   * Formulari reactiu que conté els camps per a l'autenticació.
   */
  public myForm: FormGroup = this.fb.group({
    email: ['rafa@rafapenya.com', [Validators.required, Validators.email]],
    password: ['111111', [Validators.required, Validators.minLength(6)]],
  });

  /**
   * @method login
   *
   * Mètode que es crida quan l'usuari intenta iniciar sessió.
   */
  login() {
    const { email, password } = this.myForm.value;

    /**
     * Inicia la petició d'autenticació utilitzant el servei `authService`.
     */
    this.authService.login(email, password).subscribe({
      /**
       * En cas d'èxit, redirigeix a l'usuari a la pàgina del dashboard.
       */
      next: () => this.router.navigateByUrl('/dashboard'),

      /**
       * En cas d'error, mostra un missatge d'error
       */
      error: (message) => {
        Swal.fire('Error', message, 'error');
      },
    });
  }
}
