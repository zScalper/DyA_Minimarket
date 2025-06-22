import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoDTO } from '../models/producto.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/productos'; // Ajusta si tu ruta cambia

  constructor(private http: HttpClient) {}

  listar(): Observable<ProductoDTO[]> {
    return this.http.get<ProductoDTO[]>(this.apiUrl);
  }

  obtenerPorId(id: number): Observable<ProductoDTO> {
    return this.http.get<ProductoDTO>(`${this.apiUrl}/${id}`);
  }

  obtenerPorSku(sku: string): Observable<ProductoDTO> {
    return this.http.get<ProductoDTO>(`${this.apiUrl}/sku/${sku}`);
  }

  registrar(producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http.post<ProductoDTO>(this.apiUrl, producto);
  }

  editar(id: number, producto: ProductoDTO): Observable<ProductoDTO> {
    return this.http.put<ProductoDTO>(`${this.apiUrl}/${id}`, producto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

