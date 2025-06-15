import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'; // Importa el servicio para manejar JWT
import { Router } from '@angular/router'; // Importa Router para redirigir al usuario
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private apiUrl = 'http://localhost:8080/auth/login'; // URL del endpoint de autenticación

  constructor(private http: HttpClient, private router: Router) { } // Inyección de HttpClient para realizar peticiones HTTP

  /**
   * Método para iniciar sesión enviando las credenciales al backend
   * @param cuenta Objeto con email y password
   * @returns Observable con la respuesta de la API
   */
  login(data: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post(this.apiUrl, data, { headers });
  }

  /**
   * Guarda el token JWT durante la sesión activa del usuario
   * @param token Cadena JWT obtenida tras el inicio de sesión
   */
  guardarToken(token: string): void {
    sessionStorage.setItem('jwtToken', token);
    console.log('JWT almacenado:', sessionStorage.getItem('jwtToken'));
  }

  /**
   * Obtiene el token JWT almacenado en el navegador
   * @returns Token como string o null si no existe
   */
  obtenerToken(): string | null {
    return typeof window !== 'undefined' ? sessionStorage.getItem('jwtToken') : null;
  }

  obtenerRol(): string | null {
    const token = this.obtenerToken();
    if (!token) return null; // Si no hay token, no hay rol

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.rol || null; // Extrae el rol si existe
  }

  isAuthenticated(): boolean {
    const token = this.obtenerToken();
    return token !== null && token !== '' && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    sessionStorage.removeItem('jwtToken'); // Eliminar token
    this.router.navigate(['/login']); // Redirigir al login
  }
}