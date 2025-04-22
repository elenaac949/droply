import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink,RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

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

  get user(): User | null {
    return this.authService.currentUser;
  }

  isAdmin(): boolean {
    if (!this.user?.email) return false;
    return this.user.email === 'admin@droply.com'; 
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error al cerrar sesión:', err)
    });
  }
}