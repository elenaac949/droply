import { Injectable, inject } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  register(email: any, password: any) {
    throw new Error('Method not implemented.');
  }
  private auth: Auth = inject(Auth);
  
  currentUser$ = authState(this.auth);
  
  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  signUp(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => userCredential.user));
  }

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => userCredential.user));
  }

  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}