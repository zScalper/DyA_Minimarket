import { Component, OnInit } from '@angular/core';
import { ProductoDTO } from '../../../models/producto.dto';
import { CategoriaDTO } from '../../../models/categoria.dto';
import { UnidadDTO } from '../../../models/unidad.dto';
import { EstadoDTO } from '../../../models/estado.dto';
import { ProveedorDTO } from '../../../models/proveedor.dto';
import { ProductoService } from '../../../services/producto.service';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { UnidadService } from '../../../services/unidad.service';
import { EstadoService } from '../../../services/estado.service';
import { ProveedorService } from '../../../services/proveedor.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-ingreso-producto',
  imports: [CommonModule,FormsModule],
  templateUrl: './ingreso-producto.component.html',
  styleUrl: './ingreso-producto.component.css'
})
export class IngresoProductoComponent implements OnInit {
  producto: ProductoDTO = {
    nombre: '',
    cantidad: 0,
    precio: 0,
    sku: '',
    codCategoria: {} as CategoriaDTO,
    codUnidad: {} as UnidadDTO,
    codEstado: {} as EstadoDTO,
    codProveedor: {} as ProveedorDTO
  };

  categorias: CategoriaDTO[] = [];
  unidades: UnidadDTO[] = [];
  estados: EstadoDTO[] = [];
  proveedores: ProveedorDTO[] = [];

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private unidadService: UnidadService,
    private estadoService: EstadoService,
    private proveedorService: ProveedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaService.getAll().subscribe(data => this.categorias = data);
    this.unidadService.getAll().subscribe(data => this.unidades = data);
    this.estadoService.getAll().subscribe(data => this.estados = data);
    this.proveedorService.getAll().subscribe(data => this.proveedores = data);
  }

  guardar(): void {
    if (!this.producto.nombre || !this.producto.sku || !this.producto.codCategoria?.id) {
      alert('Completa los campos obligatorios.');
      return;
    }

    this.productoService.registrar(this.producto).subscribe(() => {
      alert('✅ Producto registrado correctamente');
      this.router.navigate(['/dashboard/almacen/inventario']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/almacen/inventario']);
  }
}
