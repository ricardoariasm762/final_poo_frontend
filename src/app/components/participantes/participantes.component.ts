import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipanteService } from '../../services/participante.service';
import {
  EquipoFutbol, EquipoFutbolRequest,
  EquipoBaloncesto, EquipoBaloncestoRequest,
  JugadorTenis, JugadorTenisRequest
} from '../../models/participante.model';

type TabActiva = 'futbol' | 'baloncesto' | 'tenis';

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './participantes.component.html'
})
export class ParticipantesComponent implements OnInit {

  tabActiva: TabActiva = 'futbol';
  error = '';
  exito = '';
  mostrarForm = false;

  futbol:     EquipoFutbol[]     = [];
  baloncesto: EquipoBaloncesto[] = [];
  tenis:      JugadorTenis[]     = [];

  futbolReq: EquipoFutbolRequest = {
    nombre: '', ciudad: '', entrenador: '',
    estadio: '', colorCamiseta: '', numeroPlantel: 11
  };
  baloncestoReq: EquipoBaloncestoRequest = {
    nombre: '', ciudad: '', entrenador: '',
    cancha: '', conferencia: '', numeroPlantel: 5
  };
  tenisReq: JugadorTenisRequest = {
    nombre: '', ciudad: '', entrenador: '',
    nacionalidad: '', ranking: 1, manoHabil: 'DIESTRA'
  };

  constructor(private service: ParticipanteService) {}

  ngOnInit(): void {
    this.cargarTodo();
  }

  cargarTodo(): void {
    this.service.listarFutbol().subscribe(d => this.futbol = d);
    this.service.listarBaloncesto().subscribe(d => this.baloncesto = d);
    this.service.listarTenis().subscribe(d => this.tenis = d);
  }

  setTab(tab: TabActiva): void {
    this.tabActiva  = tab;
    this.mostrarForm = false;
    this.error = '';
  }

  guardar(): void {
    this.error = '';
    if (this.tabActiva === 'futbol') {
      this.service.crearFutbol(this.futbolReq).subscribe({
        next: () => { this.exito = 'Equipo creado'; this.mostrarForm = false; this.cargarTodo(); },
        error: (e) => { this.error = e.error?.mensaje || 'Error'; }
      });
    } else if (this.tabActiva === 'baloncesto') {
      this.service.crearBaloncesto(this.baloncestoReq).subscribe({
        next: () => { this.exito = 'Equipo creado'; this.mostrarForm = false; this.cargarTodo(); },
        error: (e) => { this.error = e.error?.mensaje || 'Error'; }
      });
    } else {
      this.service.crearTenis(this.tenisReq).subscribe({
        next: () => { this.exito = 'Jugador creado'; this.mostrarForm = false; this.cargarTodo(); },
        error: (e) => { this.error = e.error?.mensaje || 'Error'; }
      });
    }
    setTimeout(() => this.exito = '', 3000);
  }
}