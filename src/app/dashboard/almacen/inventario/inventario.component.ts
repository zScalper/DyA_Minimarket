import { Component, OnInit } from '@angular/core';
import { ProductoDTO } from '../../../models/producto.dto';
import { ProductoService } from '../../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  imports: [FormsModule, CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  productos: ProductoDTO[] = [];
  productosFiltrados: ProductoDTO[] = [];
  filtro = '';
  paginaActual = 1;
  productosPorPagina = 10;
  productoEncontrado?: ProductoDTO;
mostrarModal = false;
  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getAll().subscribe(data => {
      this.productos = data;
      this.productosFiltrados = [...data];
    });
  }
  obtenerClaseEstado(estado: string): string {
    switch (estado?.toLowerCase()) {
      case 'quiebre en bodega': return 'estado-azul';
      case 'discontinuado': return 'estado-naranja';
      case 'pendiente': return 'estado-amarillo';
      case 'activo': return 'estado-verde';
      case 'quiebre': return 'estado-rojo';
      case 'más vendido': return 'estado-morado';
      default: return 'estado-indefinido';
    }
  }

  aplicarFiltro(): void {
    const filtro = this.filtro.toLowerCase();
    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(filtro) ||
      p.sku.toLowerCase().includes(filtro) ||
      p.codCategoria?.nombreCategoria.toLowerCase().includes(filtro)
    );
  }
  buscarProducto(): void {
  const criterio = this.filtro.toLowerCase().trim();
  const encontrado = this.productos.find(p =>
    p.sku.toLowerCase() === criterio || p.nombre.toLowerCase().includes(criterio)
  );

  if (encontrado) {
    this.productoEncontrado = encontrado;
    this.mostrarModal = true;
  } else {
    alert('Producto no encontrado.');
  }
}
  get productosPaginados(): ProductoDTO[] {
    const start = (this.paginaActual - 1) * this.productosPorPagina;
    return this.productosFiltrados.slice(start, start + this.productosPorPagina);
  }

  totalPaginas(): number {
    return Math.ceil(this.productosFiltrados.length / this.productosPorPagina);
  }

  cambiarPagina(p: number): void {
    this.paginaActual = p;
  }
}
