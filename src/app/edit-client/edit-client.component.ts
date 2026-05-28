import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../clients.service';
import { Cliente, ClienteCreateRequest, Genero, TipoIdentificacion } from '../models/cliente.model';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent implements OnInit {
  form!: FormGroup;
  clientId: string | null = null;
  loading = false;
  loadingClient = false;
  error = '';
  successMessage = '';

  readonly generos: readonly Genero[] = ['MASCULINO', 'FEMENINO', 'OTRO'];
  readonly tiposIdentificacion: readonly TipoIdentificacion[] = ['CC', 'CE', 'NIT', 'TI'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly clientsService: ClientsService,
    private readonly route: ActivatedRoute,
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
      direccion: ['', [Validators.minLength(5)]],
      activo: [true, [Validators.required]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.error = 'El ID del cliente no es válido.';
      return;
    }

    this.clientId = idParam;
    this.loadClient(idParam);
  }

  private loadClient(id: string): void {
    this.loadingClient = true;
    this.error = '';

    this.clientsService.getClienteById(id).subscribe({
      next: (cliente: Cliente | null) => {
        if (!cliente) {
          this.error = 'Cliente no encontrado.';
          this.loadingClient = false;
          return;
        }

        this.form.patchValue({
          nombre: cliente.nombre,
          email: cliente.email,
          numIdentificacion: cliente.numIdentificacion,
          tipoIdentificacion: cliente.tipoIdentificacion ?? '',
          genero: cliente.genero ?? '',
          telefono: cliente.telefono ?? '',
          direccion: cliente.direccion ?? '',
          activo: cliente.activo
        });

        this.loadingClient = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loadingClient = false;
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }
        this.error = typeof error.error === 'string' ? error.error : 'No se pudo cargar la información del cliente.';
      }
    });
  }

  onSubmit(): void {
    if (!this.clientId || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    const payload: ClienteCreateRequest = {
      ...this.form.value
    };

    this.clientsService.updateCliente(this.clientId, payload).subscribe({
      next: (cliente) => {
        this.loading = false;
        this.successMessage = `Cliente "${cliente.nombre}" actualizado exitosamente`;
        setTimeout(() => this.router.navigate(['/clientes']), 1200);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }
        this.error = typeof error.error === 'string'
          ? error.error
          : 'Error al actualizar el cliente. Por favor intenta de nuevo.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clientes']);
  }

  deleteClient(): void {
    if (!this.clientId) {
      return;
    }

    const nombre = this.form.value.nombre ?? '';
    const confirmado = window.confirm(`¿Eliminar el cliente "${nombre}"?`);
    if (!confirmado) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.clientsService.deleteCliente(this.clientId).subscribe({
      next: (mensaje) => {
        this.loading = false;
        this.successMessage = mensaje;
        setTimeout(() => this.router.navigate(['/clientes']), 800);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }
        this.error = typeof error.error === 'string' ? error.error : 'No se pudo eliminar el cliente.';
      }
    });
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

  get activo() {
    return this.form.get('activo');
  }
}
