import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import {
  AuthStatus,
  CheckTokenResponse,
  LoginResponse,
  User,
} from '../interfaces';

/**
 * Servei per gestionar l'autenticació d'usuaris.
 *
 *
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * @private
   *
   * URL base per les peticions HTTP al servidor.
   */
  private readonly baseUrl: string = environment.baseUrl;

  /**
   * @private
   *
   * Instància del client HTTP per realitzar peticions al servidor.
   */
  private http = inject(HttpClient);

  /**
   * @private
   *
   * Senyal que emmagatzema les dades de l'usuari actual.
   */
  private _currentUser = signal<User | null>(null);

  /**
   * @private
   *
   * Senyal que emmagatzema l'estat d'autenticació actual.
   */
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  /**
   * @public
   *
   * Retorna les dades de l'usuari actual.
   */
  public currentUser = computed(() => this._currentUser());

  /**
   * @public
   *
   * Retorna l'estat d'autenticació actual.
   */
  public authStatus = computed(() => this._authStatus());

  /**
   * @constructor
   *
   * Inicialitza el servei i comprova l'estat d'autenticació actual.
   */
  constructor() {
    this.checkAuthStatus().subscribe();
  }

  /**
   * @private
   *
   * Configura les dades d'autenticació en el client.
   *
   * @param {User} user - Les dades de l'usuari.
   * @param {string} token - El token d'autenticació.
   *
   * @returns {boolean} Retorna `true` quan la configuració ha tingut èxit.
   */
  private setAuthentication(user: User, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);

    return true;
  }

  /**
   * @public
   *
   * Realitza l'inici de sessió de l'usuari.
   *
   * @param {string} email - Correu electrònic de l'usuari.
   * @param {string} password - Contrasenya de l'usuari.
   *
   * @returns {Observable<boolean>} Retorna un `Observable` que indica si l'inici de sessió ha tingut èxit.
   */
  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  /**
   * @public
   *
   * Comprova l'estat d'autenticació de l'usuari actual.
   *
   * @returns {Observable<boolean>} Retorna un `Observable` que indica si la comprovació ha tingut èxit.
   */
  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  /**
   * @public
   *
   * Tanca la sessió de l'usuari actual i neteja les seves dades.
   */
  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }
}
