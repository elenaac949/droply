import { Component } from '@angular/core';
import { 
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  registerForm: FormGroup;
  loading = false; // Controla el estado de carga
  errorMessage: string | null = null; // Mensajes de error del servidor
  hidePassword = true; // Controla la visibilidad de la contraseña

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Configuración del formulario con validaciones
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator() });
  }

  /**
   * Validador personalizado para la fortaleza de la contraseña
   * @returns ValidatorFn con las reglas de validación
   */
  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      
      // Requisitos de la contraseña
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      
      // Objeto de errores
      const errors: ValidationErrors = {};
      if (!hasUpperCase) errors['missingUpperCase'] = true;
      if (!hasNumber) errors['missingNumber'] = true;
      if (!hasSpecialChar) errors['missingSpecialChar'] = true;
      
      return Object.keys(errors).length ? errors : null;
    };
  }

  /**
   * Validador para confirmar que las contraseñas coincidan
   * @returns ValidatorFn con la validación de coincidencia
   */
  private passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      
      if (password && confirmPassword && password !== confirmPassword) {
        formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
        return { passwordMismatch: true };
      } else {
        formGroup.get('confirmPassword')?.setErrors(null);
        return null;
      }
    };
  }

  // Getters para acceder fácilmente a los controles del formulario
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  /**
   * Maneja el envío del formulario
   */
  onSubmit() {
    // No hacer nada si el formulario es inválido o ya está cargando
    if (this.registerForm.invalid || this.loading) return;

    this.loading = true;
    this.errorMessage = null;

    const { email, password } = this.registerForm.value;

    // Llamada al servicio de autenticación
    this.authService.register(email, password)
      .subscribe({
        next: () => {
          // Redirigir al home después de registro exitoso
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  /**
   * Alterna la visibilidad de la contraseña
   */
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
