import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProveedorDTO } from '../models/proveedor.dto';
import { Observable } from 'rxjs';
import { TipoProveedorDTO } from '../models/tipoProveedor.dto';
@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProveedorDTO[]> {
    return this.http.get<ProveedorDTO[]>(`${this.apiUrl}/proveedores`);
  }
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/proveedores/${id}`);
  }
  obtenerTipos(): Observable<TipoProveedorDTO[]> {
    return this.http.get<TipoProveedorDTO[]>(`${this.apiUrl}/tipo-proveedor`);
  }
  obtenerPorId(id: number): Observable<ProveedorDTO> {
    return this.http.get<ProveedorDTO>(`${this.apiUrl}/proveedores/${id}`);
  }
  actualizar(id: number, proveedor: ProveedorDTO): Observable<ProveedorDTO> {
    return this.http.put<ProveedorDTO>(`${this.apiUrl}/proveedores/${id}`, proveedor);
  }
  registrar(proveedor: ProveedorDTO): Observable<ProveedorDTO> {
    return this.http.post<ProveedorDTO>(`${this.apiUrl}/proveedores`, proveedor);
  }
}
