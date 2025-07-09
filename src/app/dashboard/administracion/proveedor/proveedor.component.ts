import { Component, OnInit } from '@angular/core';
import { ProveedorDTO } from '../../../models/proveedor.dto';
import { ProveedorService } from '../../../services/proveedor.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-proveedor',
  imports: [CommonModule, RouterModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent implements OnInit {
  proveedores: ProveedorDTO[] = [];

  constructor(
    private proveedorService: ProveedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proveedorService.getAll().subscribe(data => {
      this.proveedores = data;
    });
  }
  irANuevoProveedor(): void {
    this.router.navigate(['/dashboard/administracion/nuevo-proveedor']);
  }

  editarProveedor(id: number): void {
    this.router.navigate(['/dashboard/administracion/editar-proveedor', id]);
  }

  eliminarProveedor(id: number): void {
    const confirmar = confirm('¿Estás seguro de eliminar este proveedor?');
    if (confirmar) {
      this.proveedorService.eliminar(id).subscribe(() => {
        this.proveedores = this.proveedores.filter(p => p.id !== id);
      });
    }
  }
}
