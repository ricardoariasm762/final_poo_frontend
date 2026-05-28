import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Torneo,
  TorneoRequest,
  FaseGruposRequest,
  TipoDeporte
} from '../models/torneo.model';

@Injectable({ providedIn: 'root' })
export class TorneoService {

  private url = `${environment.apiUrl}/torneos`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(this.url);
  }

  obtener(id: number): Observable<Torneo> {
    return this.http.get<Torneo>(`${this.url}/${id}`);
  }

  crear(torneo: TorneoRequest): Observable<Torneo> {
    return this.http.post<Torneo>(this.url, torneo);
  }

  actualizar(id: number, torneo: TorneoRequest): Observable<Torneo> {
    return this.http.put<Torneo>(`${this.url}/${id}`, torneo);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  porDeporte(deporte: TipoDeporte): Observable<Torneo[]> {
    return this.http.get<Torneo[]>(`${this.url}/deporte/${deporte}`);
  }

  iniciarFaseGrupos(id: number, req: FaseGruposRequest): Observable<string> {
    return this.http.post<string>(`${this.url}/${id}/fase-grupos`, req);
  }

  reiniciarTorneo(id: number): Observable<string> {
    return this.http.post<string>(`${this.url}/${id}/reiniciar`, {});
  }

  iniciarEliminacion(id: number): Observable<string> {
    return this.http.post<string>(`${this.url}/${id}/eliminacion`, {});
  }

  avanzarRonda(id: number, fase: string): Observable<string> {
    return this.http.post<string>(
      `${this.url}/${id}/avanzar-ronda?fase=${fase}`, {});
  }
}