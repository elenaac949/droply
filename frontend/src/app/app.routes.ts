import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'home', component: HomeMapComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:SigninComponent}
];
