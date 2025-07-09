import { Component, OnInit } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { CommonModule } from '@angular/common';
import { ChartType } from 'angular-google-charts';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductoDTO } from '../../models/producto.dto';
import { ProductoService } from '../../services/producto.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GoogleChartsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  totalUsuarios = 120;
  totalProveedores = 30;
  totalProductos = 450;
  totalDespachos = 90;
  productosMasVendidos: ProductoDTO[] = [];
  constructor(private productoService: ProductoService) {}
  ngOnInit(): void {
  this.productoService.getAll().subscribe((data: any[]) => {
    this.productosMasVendidos = data.filter(p => p.codEstado.estado === 'Más vendido');
  });
}
  chartDespachos = {
    title: 'Estado de despachos',
    type: ChartType.PieChart,
    data: [
      ['Pendiente', 20],
      ['En Proceso', 30],
      ['Finalizado', 40]
    ],
    options: {
      pieHole: 0.4,
      colors: ['#F9A825', '#29B6F6', '#66BB6A'],
      legend: 'bottom'
    },
    width: 400,
    height: 300
  };

  chartProductos = {
    title: 'Top productos registrados',
    type: ChartType.BarChart,
    data: [ // <-- Nombres de columna aquí
      ['Arroz', 120],
      ['Aceite', 90],
      ['Leche', 75],
      ['Atún', 60],
      ['Fideos', 50]
    ],
    options: {
      legend: { position: 'none' },
      colors: ['#5C6BC0']
    },
    width: 500,
    height: 300
  };
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
}
