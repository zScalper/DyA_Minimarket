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

  create(req: CotizacionDTO): Observable<CotizacionDTO> {
    return this.http.post<CotizacionDTO>(this.apiUrl, req);
  }

  update(id: number, req: CotizacionDTO): Observable<CotizacionDTO> {
    return this.http.put<CotizacionDTO>(`${this.apiUrl}/${id}`, req);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
