import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { DespachoService } from '../../../services/despacho.service';
import { DespachoDTO } from '../../../models/despacho.dto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-despacho',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './despacho.component.html',
  styleUrl: './despacho.component.css'
})
export class DespachoComponent implements OnInit {
  despachos: DespachoDTO[] = [];
  despachoSeleccionado?: DespachoDTO;
  mostrarModal: boolean = false;

  constructor(
    private despachoService: DespachoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDespachos();
  }

  cargarDespachos(): void {
    this.despachoService.getAll().subscribe({
      next: (data) => {
        this.despachos = data;
      },
      error: (error) => {
        console.error('❌ Error al cargar despachos:', error);
      }
    });
  }

  irANuevoDespacho(): void {
    this.router.navigate(['/dashboard/logistica/nuevo-despacho']);
  }

  editarDespacho(id: number): void {
    this.router.navigate(['/dashboard/logistica/editar-despacho', id]);
  }

  eliminarDespacho(id: number): void {
    const confirmar = confirm('¿Estás seguro de eliminar este despacho?');
    if (confirmar) {
      this.despachoService.eliminar(id).subscribe({
        next: () => {
          this.despachos = this.despachos.filter(d => d.id !== id);
        },
        error: (error) => {
          console.error('❌ Error al eliminar despacho:', error);
        }
      });
    }
  }
  verDetalle(despacho: DespachoDTO): void {
      this.despachoSeleccionado = despacho;
      this.mostrarModal = true;
    }
  obtenerClaseEstado(estado: string): string {
    switch (estado?.toUpperCase()) {
      case 'PENDIENTE': return 'estado-pendiente';
      case 'EN PROCESO': return 'estado-proceso';
      case 'FINALIZADO': return 'estado-finalizado';
      default: return '';
    }
  }
  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
