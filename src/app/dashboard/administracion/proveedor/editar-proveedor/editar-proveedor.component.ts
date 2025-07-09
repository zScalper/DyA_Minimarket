import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedorService } from '../../../../services/proveedor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-proveedor',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-proveedor.component.html',
  styleUrl: './editar-proveedor.component.css'
})
export class EditarProveedorComponent {
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
    this.id = +this.route.snapshot.params['id'];

    // Cargar tipos de proveedor primero
    this.proveedorService.obtenerTipos().subscribe(tiposData => {
      this.tipoProveedor = tiposData;

      // Una vez que los tipos estén listos, carga el proveedor
      this.proveedorService.obtenerPorId(this.id).subscribe(proveedor => {
        const tipoMatch = this.tipoProveedor.find(r => r.id === proveedor.codTipo?.id) ?? null;

        this.proveedorForm.patchValue({
          ...proveedor,
          codTipo: tipoMatch // Enlazamos el objeto correcto
        });
      });
    });
  }

  cargarTipos(): void {
    this.proveedorService.obtenerTipos().subscribe((data) => {
      this.tipoProveedor = data;
    });
  }
  actualizar(): void {
    if (this.proveedorForm.invalid) return;

    const proveedorActualizado = this.proveedorForm.value;

    this.proveedorService.actualizar(this.id, proveedorActualizado).subscribe({
      next: () => this.router.navigate(['/dashboard/administracion/proveedores']),
      error: ({ status, error }) => {
        const mensaje = typeof error === 'string'
          ? error
          : error?.message || 'Error desconocido';

        console.warn('📡 Error al actualizar:', mensaje);

        this.errorMessage = mensaje;
      }
    });
  }

}
