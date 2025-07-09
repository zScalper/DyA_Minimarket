import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstadoService } from '../../../../services/estado.service';
import { DespachoService } from '../../../../services/despacho.service';
import { Router } from '@angular/router';
import { TiendaService } from '../../../../services/tienda.service';
import { CommonModule } from '@angular/common';
import { ProductoDTO } from '../../../../models/producto.dto';
import { DetalleDespachoDTO } from '../../../../models/detalleDespacho.dto';
import { ProductoService } from '../../../../services/producto.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-nuevo-despacho',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-despacho.component.html',
  styleUrls: ['./nuevo-despacho.component.css']
})
export class NuevoDespachoComponent implements OnInit {
  @Output() onGuardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  despachoForm!: FormGroup;
  detalleForm!: FormGroup;
  tiendas: any[] = [];
  estados: any[] = [];
  detalles: DetalleDespachoDTO[] = [];
  skuError = '';

  constructor(
    private fb: FormBuilder,
    private tiendaService: TiendaService,
    private estadoService: EstadoService,
    private productoService: ProductoService,
    private despachoService: DespachoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.despachoForm = this.fb.group({
      codTienda: [null, Validators.required]
    });
    this.detalleForm = this.fb.group({
      sku: ['', Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]]
    });

    this.tiendaService.getAll().subscribe(t => this.tiendas = t);
  }

  agregarDetalle(): void {
    this.skuError = '';
    const { sku, cantidad } = this.detalleForm.value;

    this.productoService.getBySku(sku).subscribe({
      next: (producto: ProductoDTO) => {
        const nuevo: DetalleDespachoDTO = {
          cantidad,
          codProducto: producto
        };

        this.detalles.push(nuevo);
        this.detalleForm.reset();
      },
      error: () => {
        this.skuError = '❌ El SKU ingresado no existe.';
      }
    });
  }

  registrar(): void {
    const userId = this.authService.obtenerId(); // 🔐

    if (!userId) {
      alert('No se pudo identificar al usuario.');
      return;
    }
    this.despachoService.registrar({
      fecha: new Date().toISOString().split('T')[0], // Lo asigna el backend
      codEstado: { id: 7 }, // PENDIENTE
      codUsuario: { id: userId }, // Simulación: luego debe obtenerse del token o sesión
      detalles: this.detalles,
      codTienda: { id: this.despachoForm.value.codTienda }
    }).subscribe({
      next: () => this.router.navigate(['/dashboard/logistica/despacho'])
    });
  }

  cancelarRegistro(): void {
    this.router.navigate(['/dashboard/logistica/despacho']);
  }
}

