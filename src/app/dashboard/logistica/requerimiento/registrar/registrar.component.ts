import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { ProductoDTO } from '../../../../models/producto.dto';
import { DetalleRequerimientoDTO } from '../../../../models/detalleRequerimiento.dto';
import { ProductoService } from '../../../../services/producto.service';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  @Output() onGuardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  detalleForm!: FormGroup;
  detalles: DetalleRequerimientoDTO[] = [];
  skuError = '';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private requerimientoService: RequerimientoService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.detalleForm = this.fb.group({
      sku: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]]
    });
  }

  agregarDetalle(): void {
    this.skuError = '';
    const { sku, cantidad } = this.detalleForm.value;

    this.productoService.obtenerPorSku(sku).subscribe({
      next: (producto: ProductoDTO) => {
        const nuevoDetalle: DetalleRequerimientoDTO = {
          cantidad,
          codProducto: producto
        };

        this.detalles.push(nuevoDetalle);
        this.detalleForm.reset();
      },
      error: () => {
        this.skuError = '❌ El SKU ingresado no existe en el sistema.';
      }
    });
  }

  guardar(): void {
    const userId = this.authService.obtenerId(); // 🔐

    if (!userId) {
      alert('No se pudo identificar al usuario.');
      return;
    }
    this.requerimientoService.registrar({
      fecha: new Date().toISOString().split('T')[0],  // Lo asigna el backend
      codEstado: { id: 7 },   // PENDIENTE
      codUsuario: { id: userId },  // Simulación: luego debe obtenerse del token o sesión
      detalles: this.detalles
    }).subscribe({
      next: () => this.router.navigate(['/dashboard/logistica/requerimiento'])
    });
  }

  cancelarRegistro(): void {
    this.cancelar.emit();
  }
}
