import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Mejor validación para email
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        (response) => {
          this.authService.guardarToken(response.token);
          console.log('Login exitoso, token guardado:', response.token);
          this.router.navigate(['/dashboard/inicio']); // Redirigir al dashboard
        },
        (error) => {
          console.error('Error en login:', error);
          this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa correctamente los campos.';
    }
  }
}




