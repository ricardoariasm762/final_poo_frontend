import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  EquipoFutbol, EquipoFutbolRequest,
  EquipoBaloncesto, EquipoBaloncestoRequest,
  JugadorTenis, JugadorTenisRequest
} from '../models/participante.model';

@Injectable({ providedIn: 'root' })
export class ParticipanteService {

  private url = `${environment.apiUrl}/participantes`;

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  // ── Fútbol ──────────────────────────────────
  listarFutbol(): Observable<EquipoFutbol[]> {
    return this.http.get<EquipoFutbol[]>(`${this.url}/futbol`);
  }

  crearFutbol(req: EquipoFutbolRequest): Observable<EquipoFutbol> {
    return this.http.post<EquipoFutbol>(`${this.url}/futbol`, req);
  }

  // ── Baloncesto ──────────────────────────────
  listarBaloncesto(): Observable<EquipoBaloncesto[]> {
    return this.http.get<EquipoBaloncesto[]>(`${this.url}/baloncesto`);
  }

  crearBaloncesto(req: EquipoBaloncestoRequest): Observable<EquipoBaloncesto> {
    return this.http.post<EquipoBaloncesto>(`${this.url}/baloncesto`, req);
  }

  // ── Tenis ───────────────────────────────────
  listarTenis(): Observable<JugadorTenis[]> {
    return this.http.get<JugadorTenis[]>(`${this.url}/tenis`);
  }

  crearTenis(req: JugadorTenisRequest): Observable<JugadorTenis> {
    return this.http.post<JugadorTenis>(`${this.url}/tenis`, req);
  }
}