import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "droply-7d67f", appId: "1:278889120316:web:edff631f26a2aa9ec17939", storageBucket: "droply-7d67f.firebasestorage.app", apiKey: "AIzaSyCJyC0BUzHmI3zRc5kq0eqveNG7WO_-dro", authDomain: "droply-7d67f.firebaseapp.com", messagingSenderId: "278889120316" })), provideAuth(() => getAuth())]
};
