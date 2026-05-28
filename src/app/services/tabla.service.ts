import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TablaPosiciones } from '../models/tabla.model';

@Injectable({ providedIn: 'root' })
export class TablaService {

  private url = `${environment.apiUrl}/tabla`;

  constructor(private http: HttpClient) {}

  porTorneo(torneoId: number): Observable<TablaPosiciones[]> {
    return this.http.get<TablaPosiciones[]>(`${this.url}/torneo/${torneoId}`);
  }

  porGrupo(torneoId: number, grupo: string): Observable<TablaPosiciones[]> {
    return this.http.get<TablaPosiciones[]>(
      `${this.url}/torneo/${torneoId}/grupo/${grupo}`);
  }
}