import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Encuentro, ResultadoRequest } from '../models/encuentro.model';

@Injectable({ providedIn: 'root' })
export class EncuentroService {

  private url = `${environment.apiUrl}/encuentros`;

  constructor(private http: HttpClient) {}

  porTorneo(torneoId: number): Observable<Encuentro[]> {
    return this.http.get<Encuentro[]>(`${this.url}/torneo/${torneoId}`);
  }

  porFase(torneoId: number, fase: string): Observable<Encuentro[]> {
    return this.http.get<Encuentro[]>(
      `${this.url}/torneo/${torneoId}/fase/${fase}`);
  }

  registrarResultado(id: number, req: ResultadoRequest): Observable<Encuentro> {
    return this.http.put<Encuentro>(`${this.url}/${id}/resultado`, req);
  }
}