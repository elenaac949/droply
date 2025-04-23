import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = false;
  firebaseError = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  async onLogin() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.firebaseError = '';

    try {
      const { email, password } = this.loginForm.value;
      
      if (!email || !password) {
        this.isLoading = false;
        return;
      }

      const result = await this.authService.login(email, password);
      
      if (result.error) {
        this.firebaseError = result.error;
      } else {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error en login:', error);
      this.firebaseError = 'Ocurrió un error durante el login';
    } finally {
      this.isLoading = false;
    }
  }
}