import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CotizacionService } from '../../../../services/cotizacion.service';
import { MonedaService } from '../../../../services/moneda.service';
import { FormaPagoService } from '../../../../services/forma-pago.service';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { CotizacionDTO } from '../../../../models/cotizacion.dto';
import { DetalleCotizacionDTO } from '../../../../models/detalleCotizacion.dto';
import { MonedaDTO } from '../../../../models/moneda.dto';
import { FormaPagoDTO } from '../../../../models/formaPago.dto';
import { RequerimientoDTO } from '../../../../models/requerimiento.dto';
import { EstadoDTO } from '../../../../models/estado.dto';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-cotizacion',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registrar-cotizacion.component.html',
  styleUrls: ['./registrar-cotizacion.component.css']
})
export class RegistrarCotizacionComponent implements OnInit {
  requerimiento?: RequerimientoDTO;
  detalles: DetalleCotizacionDTO[] = [];
  monedas: MonedaDTO[] = [];
  formasPago: FormaPagoDTO[] = [];
  camposIncompletos = false;


  fechaVencimiento: string = '';

  constructor(
    private route: ActivatedRoute,
    private requerimientoService: RequerimientoService,
    private cotizacionService: CotizacionService,
    private monedaService: MonedaService,
    private formaPagoService: FormaPagoService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const id = Number(params.get('id'));
    if (id) {
      this.requerimientoService.getById(id).subscribe(req => {
        this.requerimiento = req;

        this.detalles = req.detalles.map(d => ({
          codProducto: d.codProducto,
          cantidad: d.cantidad,
          precioUnitario: 0,
          codMoneda: { id: 1},
          codFormaPago: { id: 1}
        }));
      });
    }
  });

    this.monedaService.getAll().subscribe(data => (this.monedas = data));
    this.formaPagoService.getAll().subscribe(data => (this.formasPago = data));
  }

  guardar(): void {
  this.camposIncompletos = false;

  const fechaHoy = new Date().toISOString().split('T')[0];
  if (!this.fechaVencimiento || this.fechaVencimiento < fechaHoy) {
    this.camposIncompletos = true;
    alert('La fecha de vencimiento es obligatoria y no puede ser anterior a hoy.');
    return;
  }

  const detallesValidos = this.detalles.every(d =>
    d.precioUnitario > 0 &&
    d.codMoneda?.id &&
    d.codFormaPago?.id
  );

  if (!detallesValidos) {
    this.camposIncompletos = true;
    alert('Completa todos los campos: precio, moneda y forma de pago por cada producto.');
    return;
  }

  const cotizacion: CotizacionDTO = {
    fecha: fechaHoy,
    fechaVencimiento: this.fechaVencimiento,
    codEstado: { id: 8 } as EstadoDTO,
    codRequerimiento: { id: this.requerimiento?.id } as RequerimientoDTO,
    detalles: this.detalles
  };

  this.cotizacionService.registrar(cotizacion).subscribe(() => {
    alert('✅ Cotización registrada exitosamente.');
  });
}

}


