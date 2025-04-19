import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showAuthButtons = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Obtenemos la ruta sin parámetros de query
        const currentRoute = this.router.url.split('?')[0]; 
        
        // Definimos las rutas donde deben mostrarse los botones
        const publicRoutes = ['/', '/login', '/register'];
        
        // Verificamos si la ruta actual está en la lista
        this.showAuthButtons = publicRoutes.includes(currentRoute);
      }
    });
  }
}