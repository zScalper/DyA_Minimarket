import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CotizacionDTO } from '../../../models/cotizacion.dto';
import { CotizacionService } from '../../../services/cotizacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrarComponent } from './registrar/registrar.component';
@Component({
  selector: 'app-cotizacion',
  imports: [CommonModule, ReactiveFormsModule, RegistrarComponent],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css'
})
export class CotizacionComponent {
  cotizaciones: CotizacionDTO[] = [];
  formulario!: FormGroup;
  mostrarRegistrar = false;

  constructor(private service: CotizacionService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.mostrarRegistrar = this.router.url.endsWith('/registrar');
    });
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      fecha: [''],
      fechaVencimiento: [''],
      codRequerimiento: [null],
      codDetalleCotizacion: [null],
      codEstado: [null]
    });

    this.cargarCotizaciones();
  }

  cargarCotizaciones(): void {
    this.service.getAll().subscribe(data => this.cotizaciones = data);
  }
  irANuevaCotizacion() {
    this.router.navigate(['/dashboard/logistica/cotizacion/registrar']);
  }
  onCancelarRegistrar() {
    this.mostrarRegistrar = false;
  }
  editar(req: CotizacionDTO): void {
    this.formulario.setValue(req);
  }

  eliminar(id: number): void {
    this.service.delete(id).subscribe(() => this.cargarCotizaciones());
  }
}
