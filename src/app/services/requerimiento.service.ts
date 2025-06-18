import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequerimientoDTO } from '../models/requerimiento.dto';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoService {
  private apiUrl = 'http://localhost:8080/requerimientos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<RequerimientoDTO[]> {
    return this.http.get<RequerimientoDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<RequerimientoDTO> {
    return this.http.get<RequerimientoDTO>(`${this.apiUrl}/${id}`);
  }

  create(req: RequerimientoDTO): Observable<RequerimientoDTO> {
    return this.http.post<RequerimientoDTO>(this.apiUrl, req);
  }

  update(id: number, req: RequerimientoDTO): Observable<RequerimientoDTO> {
    return this.http.put<RequerimientoDTO>(`${this.apiUrl}/${id}`, req);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}