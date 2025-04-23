import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente para el inicio de sesión de usuarios.
 * 
 * Maneja el formulario de login, validación de credenciales y redirección.
 * Utiliza ReactiveForms para el manejo del formulario y Firebase Auth para la autenticación.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  /**
   * Instancia del FormBuilder para crear formularios reactivos
   */
  private fb = inject(FormBuilder);
  /**
   * Servicio de autenticación inyectado
   */
  private authService = inject(AuthService);
  /**
   * Router para navegación programática
   */
  private router = inject(Router);

  /**Indica si se está procesando el login (estado de carga)*/
  isLoading = false;

  /**Mensaje de error recibido de Firebase Auth*/
  firebaseError = '';

   /**
   * Formulario reactivo para el login
   * Controles:
   * - email: Validación de requerido y formato email
   * - password: Validación de requerido
   */
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  /**
   * Maneja el envío del formulario de login
   * @async
   * @returns {Promise<void>}
   * 
   * Flujo:
   * 1. Valida el formulario
   * 2. Establece estado de carga
   * 3. Intenta autenticación con Firebase
   * 4. Maneja redirección o errores
   * 
   * @example
   * // En el template:
   * <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
   */
  async onLogin() {
    // No proceder si el formulario es inválido
    if (this.loginForm.invalid) return;

    // Resetear errores y activar estado de carga
    this.isLoading = true;
    this.firebaseError = '';

    try {
      const { email, password } = this.loginForm.value;
      // Verificación adicional de tipos (TypeScript strict mode)
      if (!email || !password) {
        this.isLoading = false;
        return;
      }

      // Intentar autenticación
      const result = await this.authService.login(email, password);
      
      if (result.error) {
        // Mostrar error específico de Firebase
        this.firebaseError = result.error;
      } else {
        // Redirección a página principal después de login exitoso
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error en login:', error);
      // Error genérico para errores no controlados
      this.firebaseError = 'Ocurrió un error durante el login';
    } finally {
       // Desactivar estado de carga en cualquier caso
      this.isLoading = false;
    }
  }
}