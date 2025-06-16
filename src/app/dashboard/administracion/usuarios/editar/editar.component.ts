import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-editar',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  usuarioForm!: FormGroup;
  id!: number;
  roles: any[] = [];
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
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

  this.id = +this.route.snapshot.params['id'];

  // Cargar roles primero
  this.usuarioService.obtenerRoles().subscribe(rolesData => {
    this.roles = rolesData;

    // Una vez que los roles estén listos, carga el usuario
    this.usuarioService.obtenerPorId(this.id).subscribe(usuario => {
      // Buscar el objeto de rol que coincida por ID
      const rolMatch = this.roles.find(r => r.id === usuario.rol?.id) ?? null;

      this.usuarioForm.patchValue({
        ...usuario,
        rol: rolMatch // Enlazamos el objeto correcto
      });
    });
  });
}

  cargarRoles(): void {
    this.usuarioService.obtenerRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  actualizar(): void {
  if (this.usuarioForm.invalid) return;

  const usuarioActualizado = this.usuarioForm.value;

  this.usuarioService.actualizar(this.id, usuarioActualizado).subscribe({
    next: () => this.router.navigate(['/dashboard/administracion/usuarios/listar']),
    error: ({ status, error }) => {
      const mensaje = typeof error === 'string'
        ? error
        : error?.message || 'Error desconocido';

      console.warn('📡 Error al actualizar:', mensaje);

      this.errorMessage = mensaje;

      if (status === 409) {
        const msg = mensaje.toLowerCase();

        if (msg.includes('correo')) {
          this.usuarioForm.get('email')?.setErrors({ conflict: true });
        }

        if (msg.includes('dni')) {
          this.usuarioForm.get('dni')?.setErrors({ conflict: true });
        }
      }
    }
  });
}

}
