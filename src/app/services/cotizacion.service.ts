import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CotizacionDTO } from '../models/cotizacion.dto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  private apiUrl = 'http://localhost:8080/cotizaciones';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CotizacionDTO[]> {
    return this.http.get<CotizacionDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<CotizacionDTO> {
    return this.http.get<CotizacionDTO>(`${this.apiUrl}/${id}`);
  }

  registrar(dto: CotizacionDTO): Observable<CotizacionDTO> {
    return this.http.post<CotizacionDTO>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: CotizacionDTO): Observable<CotizacionDTO> {
    return this.http.put<CotizacionDTO>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
