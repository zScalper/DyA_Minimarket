import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonedaDTO } from '../models/moneda.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private apiUrl = 'http://localhost:8080/monedas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MonedaDTO[]> {
    return this.http.get<MonedaDTO[]>(this.apiUrl);
  }
}

