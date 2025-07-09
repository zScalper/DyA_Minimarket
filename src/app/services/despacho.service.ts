import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DespachoDTO } from '../models/despacho.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DespachoService {
  private apiUrl = 'http://localhost:8080/despachos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<DespachoDTO[]> {
    return this.http.get<DespachoDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<DespachoDTO> {
    return this.http.get<DespachoDTO>(`${this.apiUrl}/${id}`);
  }

  registrar(despacho: DespachoDTO): Observable<DespachoDTO> {
    return this.http.post<DespachoDTO>(this.apiUrl, despacho);
  }

  actualizar(id: number, despacho: DespachoDTO): Observable<DespachoDTO> {
    return this.http.put<DespachoDTO>(`${this.apiUrl}/${id}`, despacho);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

