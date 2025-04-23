import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/**
 * Componente para el registro de nuevos usuarios
 * 
 * Maneja el formulario de registro con validaciones y comunicación
 * con el servicio de autenticación de Firebase.
 * 
 * Nota: A pesar del nombre 'Signin', este componente maneja el registro (signup).
 * Considerar renombrar a 'RegisterComponent' para mayor claridad.
 */
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  // Inyección de dependencias
  private fb = inject(FormBuilder);          // Constructor de formularios reactivos
  private authService = inject(AuthService); // Servicio de autenticación
  private router = inject(Router);          // Router para navegación

  // Estado del componente
  isLoading = false;      // Bandera para estado de carga durante el registro
  firebaseError = '';    // Almacena errores de autenticación de Firebase

  /**
   * Formulario de registro con validaciones
   * Campos:
   * - email: Requerido con validación de formato email
   * - password: Requerido con longitud mínima de 6 caracteres
   * - confirmPassword: Requerido con validación personalizada de coincidencia
   */
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  /**
   * Validador personalizado para verificar que password y confirmPassword coincidan
   * @param control El FormGroup que contiene los campos de contraseña
   * @returns ValidationErrors si no coinciden, null si son válidos
   */
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    // Retorna error si las contraseñas no coinciden
    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }
    return null; // Retorna null si la validación pasa
  }

  /**
   * Maneja el envío del formulario de registro
   * @async
   */
  async onRegister() {
    // Salir si el formulario es inválido
    if (this.registerForm.invalid) return;

    // Establecer estado de carga y limpiar errores previos
    this.isLoading = true;
    this.firebaseError = '';

    // Extraer valores del formulario
    const { email, password } = this.registerForm.value;
    
    // Validación de tipos (aunque la validación del formulario debería prevenir esto)
    if (!email || !password) {
      this.isLoading = false;
      return;
    }

    // Intentar registro
    const result = await this.authService.register(email, password);
    this.isLoading = false;

    // Manejar resultado
    if (result.error) {
      this.firebaseError = result.error; // Mostrar mensaje de error
    } else {
      this.router.navigate(['/']); // Redirigir al éxito
    }
  }
}