import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente.model';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  clientes: Cliente[] = [];
  loading = false;
  error = '';
  successMessage = '';

  private readonly avatarClasses = [
    'bg-blue-100 text-blue-700',
    'bg-purple-100 text-purple-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
    'bg-teal-100 text-teal-700',
    'bg-indigo-100 text-indigo-700',
    'bg-green-100 text-green-700',
    'bg-orange-100 text-orange-700',
  ];

  getInitials(nombre: string): string {
    return nombre
      .split(' ')
      .slice(0, 2)
      .map(w => w.charAt(0).toUpperCase())
      .join('');
  }

  getAvatarClass(nombre: string): string {
    const index = nombre.charCodeAt(0) % this.avatarClasses.length;
    return this.avatarClasses[index];
  }

  formatId(idCliente: string): string {
    return (idCliente ?? '').split('-')[0]?.toUpperCase() ?? '';
  }

  constructor(
    private readonly clientsService: ClientsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  private loadClientes(): void {
    this.loading = true;
    this.error = '';
    this.successMessage = '';
    this.clientsService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }

        this.error = 'No se pudieron cargar los clientes';
        this.loading = false;
      }
    });
  }

  createNewClient(): void {
    this.router.navigate(['/clientes/nuevo']);
  }

  editClient(idCliente: string): void {
    this.router.navigate(['/clientes/editar', idCliente]);
  }

  deleteClient(idCliente: string, nombre: string): void {
    const confirmado = window.confirm(`¿Eliminar el cliente "${nombre}"?`);
    if (!confirmado) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.clientsService.deleteCliente(idCliente).subscribe({
      next: (mensaje) => {
        this.loading = false;
        this.successMessage = mensaje;
        this.loadClientes();
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
          : 'No se pudo eliminar el cliente';
      }
    });
  }

}
