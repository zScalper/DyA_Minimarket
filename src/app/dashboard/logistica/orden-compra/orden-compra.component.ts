import { Component, OnInit } from '@angular/core';
import { OrdenCompraDTO } from '../../../models/ordenCompra.dto';
import { OrdenCompraService } from '../../../services/orden-compra.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orden-compra',
  imports: [CommonModule,RouterModule],
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {
  ordenes: OrdenCompraDTO[] = [];
  ordenSeleccionada?: OrdenCompraDTO;
  mostrarModal = false;

  constructor(private service: OrdenCompraService) {}

  ngOnInit(): void {
    this.cargarOrdenes();
  }

  cargarOrdenes(): void {
    this.service.getAll().subscribe(data => (this.ordenes = data));
  }

  verDetalle(orden: OrdenCompraDTO): void {
    this.ordenSeleccionada = orden;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  eliminar(id: number): void {
    this.service.delete(id).subscribe(() => this.cargarOrdenes());
  }
}

