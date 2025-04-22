import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, user, UserCredential } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  // Observable público del estado de autenticación
  currentUser$ = user(this.auth).pipe(
    map(user => !!user), // Convertimos User | null a boolean
    shareReplay(1) // Para evitar múltiples suscripciones
  );

  // Obtener el usuario actual (sincrónico)
  get currentUser(): User | null {
    return this.auth.currentUser;
  }
   /**
   * Registra un nuevo usuario con email y contraseña
   * @param email Email del usuario
   * @param password Contraseña del usuario
   * @returns Observable con el resultado de la operación
   */
  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(error => {
        // Handle specific Firebase errors
        let errorMessage = 'An unknown error occurred';
        switch(error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Email is already in use';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password should be at least 6 characters';
            break;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  /**
   * Inicia sesión con email y contraseña
   * @param email Email del usuario
   * @param password Contraseña del usuario
   * @returns Observable con el resultado de la operación
   */

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      catchError(error => {
        // Handle login errors
        let errorMessage = 'Login failed';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'User not found';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

   /**
   * Cierra la sesión del usuario actual
   * @returns Observable que se completa cuando termina la operación
   */
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}