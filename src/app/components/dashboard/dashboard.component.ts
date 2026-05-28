import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TorneoService } from '../../services/torneo.service';
import { AuthService } from '../../services/auth.service';
import { TorneoRequest, TipoDeporte } from '../../models/torneo.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  mostrarFormulario = false;
  cargando = false;
  error = '';
  exito = '';

  request: TorneoRequest = {
    nombre: '',
    deporte: 'FUTBOL',
    fechaInicio: '',
    fechaFin: '',
    cantidadGrupos: 2,
    clasificadosPorGrupo: 1
  };

  deportes: TipoDeporte[] = ['FUTBOL', 'BALONCESTO', 'TENIS'];

  constructor(
    public auth: AuthService,
    private torneoService: TorneoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/torneos']);
    }
  }

  abrirFormularioCrear(deporte?: TipoDeporte): void {
    if (deporte) {
      this.request.deporte = deporte;
    }
    this.mostrarFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  crear(): void {
    this.error = '';
    this.cargando = true;

    // Safety timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (this.cargando) {
        this.cargando = false;
        this.error = 'La respuesta del servidor está tardando demasiado. Verifica tu conexión.';
      }
    }, 10000);

    this.torneoService.crear(this.request).subscribe({
      next: () => {
        clearTimeout(timeout);
        this.exito = 'Torneo creado correctamente';
        this.mostrarFormulario = false;
        this.cargando = false;
        this.resetForm();
        setTimeout(() => {
          this.exito = '';
          this.router.navigate(['/torneos']);
        }, 2000);
      },
      error: (err) => {
        clearTimeout(timeout);
        this.error = err.error?.mensaje || 'Error al crear torneo. Verifica que el servidor esté encendido.';
        this.cargando = false;
      }
    });
  }

  resetForm(): void {
    this.request = {
      nombre: '', deporte: 'FUTBOL',
      fechaInicio: '', fechaFin: '',
      cantidadGrupos: 2, clasificadosPorGrupo: 1
    };
  }
}
