import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TiendaDTO } from '../models/tienda.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = 'http://localhost:8080/tiendas';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TiendaDTO[]> {
    return this.http.get<TiendaDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<TiendaDTO> {
    return this.http.get<TiendaDTO>(`${this.apiUrl}/${id}`);
  }

  registrar(tienda: TiendaDTO): Observable<TiendaDTO> {
    return this.http.post<TiendaDTO>(this.apiUrl, tienda);
  }

  actualizar(id: number, tienda: TiendaDTO): Observable<TiendaDTO> {
    return this.http.put<TiendaDTO>(`${this.apiUrl}/${id}`, tienda);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
