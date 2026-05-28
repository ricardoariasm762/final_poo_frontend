import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ClientsService } from '../clients.service';
import { ClienteCreateRequest, Genero, TipoIdentificacion } from '../models/cliente.model';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css'
})
export class CreateClientComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  successMessage = '';

  readonly generos: readonly Genero[] = ['MASCULINO', 'FEMENINO', 'OTRO'];
  readonly tiposIdentificacion: readonly TipoIdentificacion[] = ['CC', 'CE', 'NIT', 'TI'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly clientsService: ClientsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      numIdentificacion: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^\d{1,10}$/)]],
      tipoIdentificacion: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      telefono: ['', [Validators.pattern(/^\d{7,15}$/)]],
      direccion: ['', [Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    const payload: ClienteCreateRequest = {
      ...this.form.value,
      activo: true,
    };

    this.clientsService.createCliente(payload).subscribe({
      next: (mensaje) => {
        this.loading = false;
        this.successMessage = mensaje;
        setTimeout(() => {
          this.router.navigate(['/clientes']);
        }, 2000);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }

        this.loading = false;
        this.error = typeof error.error === 'string'
          ? error.error
          : (error.error?.message || 'Error al crear el cliente. Por favor intenta de nuevo.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clientes']);
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get email() {
    return this.form.get('email');
  }

  get numIdentificacion() {
    return this.form.get('numIdentificacion');
  }

  get tipoIdentificacion() {
    return this.form.get('tipoIdentificacion');
  }

  get genero() {
    return this.form.get('genero');
  }

  get telefono() {
    return this.form.get('telefono');
  }

  get direccion() {
    return this.form.get('direccion');
  }
}
