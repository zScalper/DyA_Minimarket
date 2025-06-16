import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-agregar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent implements OnInit {
  usuarioForm!: FormGroup;
  roles: any[] = [];
  errorMessage: string = '';
  dniExistente = false;
  emailExistente = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      rol: [null, Validators.required]
    });
    this.cargarRoles();
  }
  cargarRoles(): void {
    this.usuarioService.obtenerRoles().subscribe((data) => {
      this.roles = data;
    });
  }
  guardar(): void {
    if (this.usuarioForm.invalid) return;

    this.usuarioService.crear(this.usuarioForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard/administracion/usuarios/listar']),
      error: ({ status, error }) => {
        const mensaje = typeof error === 'string'
          ? error
          : error?.message || 'Error desconocido';

        console.warn('Error recibido:', mensaje);

        this.errorMessage = mensaje;

        if (status === 409) {
          const mensajeLower = mensaje.toLowerCase();

          if (mensajeLower.includes('correo')) {
            this.usuarioForm.get('email')?.setErrors({ conflict: true });
          }

          if (mensajeLower.includes('dni')) {
            this.usuarioForm.get('dni')?.setErrors({ conflict: true });
          }
        }
      }
    });
  }


}
