import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdenCompraDTO } from '../models/ordenCompra.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {
  private apiUrl = 'http://localhost:8080/ordenes-compra';

  constructor(private http: HttpClient) {}

  getAll(): Observable<OrdenCompraDTO[]> {
    return this.http.get<OrdenCompraDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<OrdenCompraDTO> {
    return this.http.get<OrdenCompraDTO>(`${this.apiUrl}/${id}`);
  }

  registrar(dto: OrdenCompraDTO): Observable<OrdenCompraDTO> {
    return this.http.post<OrdenCompraDTO>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: OrdenCompraDTO): Observable<OrdenCompraDTO> {
    return this.http.put<OrdenCompraDTO>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

