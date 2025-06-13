import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login', 
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm: FormGroup; // Formulario reactivo que gestiona los datos de inicio de sesión
  errorMessage: string = ''; // Variable para almacenar mensajes de error en caso de credenciales incorrectas

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Se inicializa el formulario con validaciones para email y contraseña
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Requiere que el campo contenga un email válido
      password: ['', [Validators.required, Validators.minLength(6)]] // Requiere al menos 6 caracteres
    });
  }

  /**
   * Método para gestionar el proceso de inicio de sesión
   * - Envía las credenciales al servicio `AuthService`
   * - Guarda el token en `localStorage` si el login es exitoso
   * - Redirige al usuario al dashboard
   */
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const data = { email, password };

      this.authService.login(data).subscribe({
        next: (response) => {
          this.authService.guardarToken(response.token); // Guarda el token JWT
          console.log('Login exitoso, token guardado:', response.token);
          this.router.navigate(['/dashboard/inicio']); // Redirige al usuario tras autenticarse
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        },
        complete: () => {
          console.log('Petición de login completada.');
        }
      });

    } else {
      this.errorMessage = 'Por favor, completa correctamente los campos.'; // Mensaje si el formulario no es válido
    }
  }
}
// Este componente maneja el formulario de inicio de sesión, validando las credenciales del usuario