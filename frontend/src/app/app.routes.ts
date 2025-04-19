import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HomeMapComponent } from './home-map/home-map.component';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'home', component: HomeMapComponent}
];
