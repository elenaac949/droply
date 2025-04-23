import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  authService = inject(AuthService);
  router = inject(Router);

  
  get user() {
    return this.authService.currentUser();
  }

  isAdmin(): boolean {
    if (!this.user?.email) return false;
    return this.user.email === 'admin@droply.com'; 
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/']);
    } catch (err: unknown) {
      console.error('Error al cerrar sesión:', err);
    }
  }
}