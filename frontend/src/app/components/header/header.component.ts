import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

/**
 * Componente que representa la cabecera/navegación de la aplicación.
 * 
 * Este componente muestra la barra de navegación superior y maneja:
 * - Visualización del estado de autenticación
 * - Funcionalidad de logout
 * - Control de acceso para administradores
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  /**
   * Instancia del servicio de autenticación inyectado.
   * Se utiliza para manejar el estado de autenticación del usuario.
   */
  authService = inject(AuthService);
  /**
   * Instancia del Router inyectado.
   * Se utiliza para la navegación programática.
   */
  router = inject(Router);

  /**
   * Getter que obtiene el usuario actualmente autenticado.
   * @returns {User | null} El objeto User de Firebase si hay un usuario autenticado, 
   * o null si no hay usuario autenticado.
   */
  
  get user() {
    return this.authService.currentUser();
  }

  /**
   * Verifica si el usuario actual tiene privilegios de administrador.
   * @returns {boolean} 
   *   - `true` si el usuario está autenticado y su email es 'admin@droply.com'
   *   - `false` en cualquier otro caso
   */
  isAdmin(): boolean {
    if (!this.user?.email) return false;
    return this.user.email === 'admin@droply.com'; 
  }

   /**
   * Maneja el proceso de cierre de sesión del usuario.
   * 
   * @async
   * @returns {Promise<void>}
   * @throws {Error} Si ocurre algún error durante el proceso de logout
   * 
   * @example
   * // En el template:
   * <button (click)="logout()">Cerrar sesión</button>
   */
  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/']);
    } catch (err: unknown) {
      console.error('Error al cerrar sesión:', err);
    }
  }
}