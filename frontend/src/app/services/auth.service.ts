import { Injectable, inject,signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , User,onAuthStateChanged} from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private auth: Auth = inject(Auth);
  private router = inject(Router);
  currentUser = signal<User | null>(null); 


  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
    });
  }

  private firebaseErrors: {[key: string]: string} = {
    'auth/email-already-in-use': 'El correo electrónico ya está en uso',
    'auth/invalid-email': 'El correo electrónico no es válido',
    'auth/operation-not-allowed': 'Operación no permitida',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres',
    'auth/user-disabled': 'La cuenta ha sido deshabilitada',
    'auth/user-not-found': 'No se encontró el usuario',
    'auth/wrong-password': 'Contraseña incorrecta'
  };

  getErrorMessage(code: string): string {
    return this.firebaseErrors[code] || 'Ocurrió un error desconocido';
  }


  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { user: null, error: this.getErrorMessage(error.code) };
      }
      return { user: null, error: 'Error desconocido' };
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        return { user: null, error: this.getErrorMessage(error.code) };
      }
      return { user: null, error: 'Error desconocido' };
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}