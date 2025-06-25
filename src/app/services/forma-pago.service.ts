import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormaPagoDTO } from '../models/formaPago.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {
  private apiUrl = 'http://localhost:8080/formas-pago';

  constructor(private http: HttpClient) {}

  getAll(): Observable<FormaPagoDTO[]> {
    return this.http.get<FormaPagoDTO[]>(this.apiUrl);
  }
}
