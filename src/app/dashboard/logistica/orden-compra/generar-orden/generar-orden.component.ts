import { Component, OnInit } from '@angular/core';
import { CotizacionDTO } from '../../../../models/cotizacion.dto';
import { DetalleCotizacionDTO } from '../../../../models/detalleCotizacion.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { CotizacionService } from '../../../../services/cotizacion.service';
import { OrdenCompraService } from '../../../../services/orden-compra.service';
import { OrdenCompraDTO } from '../../../../models/ordenCompra.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generar-orden',
  imports: [CommonModule],
  templateUrl: './generar-orden.component.html',
  styleUrl: './generar-orden.component.css'
})
export class GenerarOrdenComponent implements OnInit {
  cotizacion?: CotizacionDTO;
  detallesSeleccionados: DetalleCotizacionDTO[] = [];
  montoTotal = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cotizacionService: CotizacionService,
    private ordenCompraService: OrdenCompraService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cotizacionService.getById(id).subscribe(c => {
      this.cotizacion = c;
      this.detallesSeleccionados = [...c.detalles];
      this.actualizarMonto();
    });
  }

  quitarDetalle(i: number): void {
    this.detallesSeleccionados.splice(i, 1);
    this.actualizarMonto();
  }

  actualizarMonto(): void {
    this.montoTotal = this.detallesSeleccionados.reduce(
      (acc, d) => acc + d.precioUnitario * d.cantidad, 0
    );
  }

  generarOrden(): void {
    if (!this.cotizacion || this.detallesSeleccionados.length === 0) return;

    const orden: OrdenCompraDTO = {
      fecha: new Date().toISOString().split('T')[0],
      montoTotal: this.montoTotal,
      codCotizacion: { id: this.cotizacion.id } as CotizacionDTO
    };

    this.ordenCompraService.registrar(orden).subscribe(() => {
      alert('✅ Orden de compra generada.');
      this.router.navigate(['/dashboard/logistica/orden-compra']);
    });
  }
}
