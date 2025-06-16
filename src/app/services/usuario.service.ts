import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDTO } from '../models/usuario.dto'; // Asegúrate de que la ruta sea correcta
import { Observable } from 'rxjs';
import { RolDTO } from '../models/rol.dto'; 

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private readonly baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  listar(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(`${this.baseUrl}/usuarios`);
  }

  obtenerPorId(id: number): Observable<UsuarioDTO> {
    return this.http.get<UsuarioDTO>(`${this.baseUrl}/usuarios/${id}`);
  }

  crear(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.baseUrl}/usuarios`, usuario);
  }

  actualizar(id: number, usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.put<UsuarioDTO>(`${this.baseUrl}/usuarios/${id}`, usuario);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/usuarios/${id}`);
  }

  obtenerRoles(): Observable<RolDTO[]> {
    return this.http.get<RolDTO[]>(`${this.baseUrl}/roles`);
  }
}

