import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaDTO } from '../models/categoria.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(this.apiUrl);
  }
}
