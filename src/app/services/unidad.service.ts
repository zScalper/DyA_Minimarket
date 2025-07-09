import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnidadDTO } from '../models/unidad.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnidadService {
  private apiUrl = 'http://localhost:8080/unidades';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UnidadDTO[]> {
    return this.http.get<UnidadDTO[]>(this.apiUrl);
  }
}
