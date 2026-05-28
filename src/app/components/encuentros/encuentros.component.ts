import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EncuentroService } from '../../services/encuentro.service';
import { TorneoService } from '../../services/torneo.service';
import { AuthService } from '../../services/auth.service';
import { Encuentro, ResultadoRequest } from '../../models/encuentro.model';
import { Torneo } from '../../models/torneo.model';

@Component({
  selector: 'app-encuentros',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './encuentros.component.html'
})
export class EncuentrosComponent implements OnInit {

  torneoId!: number;
  torneo: Torneo | null = null;
  encuentros: Encuentro[] = [];
  error  = '';
  exito  = '';
  cargando = false;
  encuentroSeleccionado: Encuentro | null = null;

  resultadoReq: ResultadoRequest = {
    puntosLocal: 0, puntosVisitante: 0
  };

  constructor(
    private route: ActivatedRoute,
    private service: EncuentroService,
    private torneoService: TorneoService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.torneoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarTorneo();
    this.cargar();
  }

  cargarTorneo(): void {
    const timeout = setTimeout(() => {
      if (!this.torneo) {
        this.error = 'La respuesta del servidor está tardando demasiado. Verifica tu conexión.';
      }
    }, 10000);

    this.torneoService.obtener(this.torneoId).subscribe({
      next: (data) => {
        this.torneo = data;
        clearTimeout(timeout);
      },
      error: () => {
        clearTimeout(timeout);
        this.error = 'Error al cargar detalles del torneo';
      }
    });
  }

  cargar(): void {
    this.error = '';
    this.cargando = true;

    const timeout = setTimeout(() => {
      if (this.cargando) {
        this.cargando = false;
        this.error = 'La respuesta del servidor está tardando demasiado. Verifica tu conexión.';
      }
    }, 10000);

    this.service.porTorneo(this.torneoId).subscribe({
      next: (data) => {
        this.encuentros = data;
        this.cargando = false;
        clearTimeout(timeout);
      },
      error: () => {
        this.error = 'Error al cargar encuentros';
        this.cargando = false;
        clearTimeout(timeout);
      }
    });
  }

  seleccionar(e: Encuentro): void {
    this.encuentroSeleccionado = e;
    this.resultadoReq = { puntosLocal: 0, puntosVisitante: 0 };
  }

  registrar(): void {
    if (!this.encuentroSeleccionado) return;
    this.service.registrarResultado(
      this.encuentroSeleccionado.id,
      this.resultadoReq
    ).subscribe({
      next: () => {
        this.exito = 'Resultado registrado correctamente';
        this.encuentroSeleccionado = null;
        this.cargar();
        setTimeout(() => this.exito = '', 3000);
      },
      error: (e) => { this.error = e.error?.mensaje || 'Error'; }
    });
  }

  get fases(): string[] {
    return [...new Set(this.encuentros.map(e => e.fase))];
  }

  porFase(fase: string): Encuentro[] {
    return this.encuentros.filter(e => e.fase === fase);
  }

  badgeEstado(estado: string): string {
    const map: Record<string, string> = {
      PROGRAMADO: 'bg-secondary',
      EN_CURSO:   'bg-warning text-dark',
      FINALIZADO: 'bg-success',
      SUSPENDIDO: 'bg-danger'
    };
    return map[estado] || 'bg-secondary';
  }
}
