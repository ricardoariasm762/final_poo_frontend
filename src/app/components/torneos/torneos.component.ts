import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TorneoService } from '../../services/torneo.service';
import { AuthService } from '../../services/auth.service';
import { Torneo, TorneoRequest, TipoDeporte, FaseGruposRequest } from '../../models/torneo.model';
import { ParticipanteService } from '../../services/participante.service';

@Component({
  selector: 'app-torneos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './torneos.component.html'
})
export class TorneosComponent implements OnInit {

  torneos: Torneo[] = [];
  participantes: any[] = [];
  cargando  = false;
  error     = '';
  exito     = '';
  mostrarFormulario = false;
  mostrarAsignarGrupos = false;
  editando = false;
  torneoIdEditando: number | null = null;
  torneoParaGrupos: Torneo | null = null;

  // Para el prompt de grupos
  gruposConfig: { letra: string, ids: string }[] = [];

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
    private participanteService: ParticipanteService
  ) {}

  ngOnInit(): void {
    this.cargar();
    this.cargarParticipantes();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    
    // Safety timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (this.cargando) {
        this.cargando = false;
        this.error = 'La respuesta del servidor está tardando demasiado. Verifica tu conexión.';
      }
    }, 10000);

    this.torneoService.listar().subscribe({
      next: (data) => { 
        this.torneos = data; 
        this.cargando = false;
        clearTimeout(timeout);
      },
      error: (err) => { 
        this.error = 'Error al conectar con el servidor. Asegúrate de que el backend esté iniciado.';
        this.cargando = false;
        clearTimeout(timeout);
        console.error('Error cargar torneos:', err);
      }
    });
  }

  cargarParticipantes(): void {
    this.participanteService.listarTodos().subscribe({
      next: (data) => { this.participantes = data; },
      error: () => { console.error('Error al cargar participantes'); }
    });
  }

  getTorneoEstado(id: number): string {
    return this.torneos.find(t => t.id === id)?.estado || 'INSCRIPCIONES';
  }

  getParticipantesPorDeporte(deporte: string): any[] {
    return this.participantes.filter(p => p.deporte === deporte);
  }

  crear(): void {
    if (this.editando && this.torneoIdEditando) {
      this.error = '';
      this.torneoService.actualizar(this.torneoIdEditando, this.request).subscribe({
        next: () => {
          this.exito = 'Torneo actualizado correctamente';
          this.cerrarFormulario();
          this.cargar();
          setTimeout(() => this.exito = '', 3000);
        },
        error: (err) => {
          this.error = err.error?.mensaje || 'Error al actualizar torneo';
        }
      });
    }
  }

  editar(torneo: Torneo): void {
    this.editando = true;
    this.torneoIdEditando = torneo.id;
    this.request = {
      nombre: torneo.nombre,
      deporte: torneo.deporte,
      fechaInicio: torneo.fechaInicio.slice(0, 10),
      fechaFin: torneo.fechaFin.slice(0, 10),
      cantidadGrupos: torneo.cantidadGrupos,
      clasificadosPorGrupo: torneo.clasificadosPorGrupo
    };
    this.mostrarFormulario = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este torneo?')) {
      this.torneoService.eliminar(id).subscribe({
        next: () => {
          this.exito = 'Torneo eliminado';
          this.cargar();
          setTimeout(() => this.exito = '', 3000);
        },
        error: (err) => {
          this.error = err.error?.mensaje || 'Error al eliminar';
        }
      });
    }
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.torneoIdEditando = null;
    this.resetForm();
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.cerrarFormulario();
    }
  }

  iniciarFaseGrupos(torneo: Torneo): void {
    this.torneoParaGrupos = torneo;
    this.gruposConfig = Array.from({ length: torneo.cantidadGrupos }, (_, i) => ({
      letra: String.fromCharCode(65 + i), // A, B, C...
      ids: ''
    }));
    this.mostrarAsignarGrupos = true;
  }

  confirmarFaseGrupos(): void {
    if (!this.torneoParaGrupos) return;

    const mapping: { [key: string]: number[] } = {};
    this.gruposConfig.forEach(g => {
      mapping[g.letra] = g.ids.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
    });

    const req: FaseGruposRequest = { grupos: mapping };

    this.torneoService.iniciarFaseGrupos(this.torneoParaGrupos.id, req).subscribe({
      next: () => {
        this.exito = 'Fase de grupos iniciada';
        this.mostrarAsignarGrupos = false;
        this.cargar();
        setTimeout(() => this.exito = '', 3000);
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al iniciar fase de grupos';
      }
    });
  }

  iniciarEliminacion(id: number): void {
    this.torneoService.iniciarEliminacion(id).subscribe({
      next: () => { this.exito = 'Fase de eliminación iniciada'; this.cargar(); },
      error: (err) => { this.error = err.error?.mensaje || 'Error'; }
    });
  }

  reiniciarTorneo(id: number): void {
    if (confirm('¿Estás seguro de reiniciar el torneo? Se borrarán todos los partidos y la tabla de posiciones.')) {
      this.torneoService.reiniciarTorneo(id).subscribe({
        next: () => { 
          this.exito = 'Torneo reiniciado a inscripciones'; 
          this.cargar(); 
          setTimeout(() => this.exito = '', 3000);
        },
        error: (err) => { this.error = err.error?.mensaje || 'Error al reiniciar'; }
      });
    }
  }

  resetForm(): void {
    this.request = {
      nombre: '', deporte: 'FUTBOL',
      fechaInicio: '', fechaFin: '',
      cantidadGrupos: 2, clasificadosPorGrupo: 1
    };
  }

  badgeEstado(estado: string): string {
    const map: Record<string, string> = {
      INSCRIPCIONES: 'bg-info text-dark',
      FASE_GRUPOS:   'bg-primary',
      ELIMINACION:   'bg-warning text-dark',
      FINALIZADO:    'bg-success'
    };
    return map[estado] || 'bg-secondary';
  }
}