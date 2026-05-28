import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, ClienteCreateRequest } from './models/cliente.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private readonly http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getClienteById(id: string): Observable<Cliente | null> {
    return this.http.get<Cliente | null>(`${this.apiUrl}/${id}`);
  }

  createCliente(cliente: ClienteCreateRequest): Observable<string> {
    return this.http.post(this.apiUrl, cliente, { responseType: 'text' });
  }

  updateCliente(id: string, cliente: ClienteCreateRequest): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  deleteCliente(id: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
