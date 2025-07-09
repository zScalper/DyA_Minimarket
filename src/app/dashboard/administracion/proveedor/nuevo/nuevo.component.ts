import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { ProveedorService } from '../../../../services/proveedor.service';

@Component({
  selector: 'app-nuevo',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent {
  proveedorForm!: FormGroup;
  id!: number;
  tipoProveedor: any[] = [];
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private proveedorService: ProveedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.proveedorForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      direccion: ['', Validators.required],
      razonSocial: ['', Validators.required],
      codTipo: [null, Validators.required]
    });

    // Cargar tipos de proveedor primero
    this.cargarTipos();
  }
  cargarTipos(): void {
    this.proveedorService.obtenerTipos().subscribe((data) => {
      this.tipoProveedor = data;
    });
  }
  guardar(): void {
    if (this.proveedorForm.invalid) return;

    this.proveedorService.registrar(this.proveedorForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard/administracion/proveedores']),
      error: ({status, error }) => {
        const mensaje = typeof error === 'string'
          ? error
          : error?.message || 'Error desconocido';

        console.warn('Error recibido:', mensaje);

        this.errorMessage = mensaje;
        if (status === 409) {
          const mensajeLower = mensaje.toLowerCase();
          if (mensajeLower.includes('ruc')) {
            this.proveedorForm.get('ruc')?.setErrors({ conflict: true });
          }
        }
      }
    });
  }
}
