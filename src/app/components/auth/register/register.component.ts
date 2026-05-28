import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  request: RegisterRequest = {
    username: '',
    password: '',
    email: '',
    roles: ['ROLE_ESPECTADOR']
  };
  confirmPassword = '';
  error    = '';
  cargando = false;

  constructor(private auth: AuthService, private router: Router) {}

  onRoleChange(event: any): void {
    const role = event.target.value;
    this.request.roles = [role];
  }

  register(): void {
    if (this.request.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }
    this.error    = '';
    this.cargando = true;

    this.auth.register(this.request).subscribe({
      next: () => this.router.navigate(['/torneos']),
      error: (err) => {
        this.error    = err.error?.mensaje || 'Error al registrar usuario';
        this.cargando = false;
      }
    });
  }
}