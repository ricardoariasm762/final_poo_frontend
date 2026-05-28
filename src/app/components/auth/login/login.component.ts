import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  request: LoginRequest = { username: '', password: '' };
  error = '';
  cargando = false;

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    this.error   = '';
    this.cargando = true;

    this.auth.login(this.request).subscribe({
      next: () => this.router.navigate(['/torneos']),
      error: (err) => {
        this.error   = err.error?.mensaje || 'Credenciales incorrectas';
        this.cargando = false;
      }
    });
  }
}