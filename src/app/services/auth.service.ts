import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private url = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/login`, request).pipe(
      tap(response => {
        localStorage.setItem('token',    response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('roles',    this.extraerRoles(response.token));
      })
    );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/register`, request).pipe(
      tap(response => {
        localStorage.setItem('token',    response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('roles',    this.extraerRoles(response.token));
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    return localStorage.getItem('username') || '';
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  isAdmin(): boolean {
    return this.getRoles().includes('ROLE_ADMIN');
  }

  isEspectador(): boolean {
    return !this.isAdmin();
  }

  // extrae los roles del payload del JWT sin librerías externas
  private extraerRoles(token: string): string {
    try {
      const payload = token.split('.')[1];
      // Manejar decodificación Base64 segura para Unicode
      const decoded = JSON.parse(decodeURIComponent(atob(payload).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')));
      
      // Spring Security guarda los roles en 'authorities' o 'roles'
      const roles = decoded.authorities || decoded.roles || [];
      const rolesNormalizados = Array.isArray(roles) 
        ? roles.map((r: any) => typeof r === 'string' ? r : r.authority)
        : [];
        
      return JSON.stringify(rolesNormalizados);
    } catch (e) {
      console.error('Error al extraer roles:', e);
      return '[]';
    }
  }
}