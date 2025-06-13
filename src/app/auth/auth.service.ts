import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación sin necesidad de declararlo en módulos
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login'; // URL del endpoint de autenticación

  constructor(private http: HttpClient) { } // Inyección de HttpClient para realizar peticiones HTTP

  /**
   * Método para iniciar sesión enviando las credenciales al backend
   * @param cuenta Objeto con email y password
   * @returns Observable con la respuesta de la API
   */
  login(cuenta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email: cuenta.email, password: cuenta.password });
  }

  /**
   * Guarda el token JWT en el almacenamiento local del navegador
   * @param token Cadena JWT obtenida tras el inicio de sesión
   */
  guardarToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  /**
   * Obtiene el token JWT almacenado en el navegador
   * @returns Token como string o null si no existe
   */
  obtenerToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
}