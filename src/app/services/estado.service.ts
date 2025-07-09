import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoDTO } from '../models/estado.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EstadoService {
  private apiUrl = 'http://localhost:8080/estados';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EstadoDTO[]> {
    return this.http.get<EstadoDTO[]>(this.apiUrl);
  }
}
