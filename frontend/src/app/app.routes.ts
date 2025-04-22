import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeMapComponent } from './components/home-map/home-map.component';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { 
        path: 'home', 
        component: HomeMapComponent,
        canActivate: [authGuard] // Acessible para usuarios autenticados
    },
    { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [noAuthGuard] // Solo accesible si NO está autenticado
    },
    { 
        path: 'register', 
        component: SigninComponent,
        canActivate: [noAuthGuard] // Solo accesible si NO está autenticado
    },
    { path: '**', redirectTo: '' } // Redirige rutas no encontradas a landing
];
