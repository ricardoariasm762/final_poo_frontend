import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OpcionMenuNode } from './models/opcion.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly menuUrl = `${environment.apiUrl}/opciones/menu`;

  constructor(private readonly http: HttpClient) {}

  getMenu(): Observable<OpcionMenuNode[]> {
    return this.http.get<OpcionMenuNode[]>(this.menuUrl);
  }
}
