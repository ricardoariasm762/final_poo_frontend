import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TablaService } from '../../services/tabla.service';
import { TorneoService } from '../../services/torneo.service';
import { TablaPosiciones } from '../../models/tabla.model';
import { Torneo } from '../../models/torneo.model';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tabla.component.html'
})
export class TablaComponent implements OnInit {

  torneoId!: number;
  torneo: Torneo | null = null;
  tabla: TablaPosiciones[] = [];
  error = '';
  cargando = false;

  constructor(
    private route: ActivatedRoute,
    private service: TablaService,
    private torneoService: TorneoService
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
        this.tabla = data;
        this.cargando = false;
        clearTimeout(timeout);
      },
      error: () => {
        this.error = 'Error al cargar la tabla';
        this.cargando = false;
        clearTimeout(timeout);
      }
    });
  }

  get grupos(): string[] {
    return [...new Set(this.tabla.map(f => f.grupo))];
  }

  porGrupo(grupo: string): TablaPosiciones[] {
    return this.tabla.filter(f => f.grupo === grupo);
  }
}
