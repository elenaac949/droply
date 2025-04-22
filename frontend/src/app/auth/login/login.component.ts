import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

 
  onSubmit() {
    this.authService.login(this.email, this.password)
      .subscribe({
        next: () => {
          // Obtiene el returnUrl de los query params o redirige a home por defecto
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl);
        },
        error: (err) => console.error('Error en login:', err)
      });
  }
}
