import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from '../models/login.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginCredentials = {
    usuario: '',
    contrasena: '',
    recordarme: false
  };

  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.authService
      .login({
        usuario: this.credentials.usuario,
        contrasena: this.credentials.contrasena
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          console.log('Login exitoso:', response);
          this.router.navigate(['/clientes']);
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.errorMessage = 'Credenciales inválidas. Por favor, intente de nuevo.';
        }
      });
  }
}
