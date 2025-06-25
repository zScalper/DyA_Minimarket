import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../../services/cotizacion.service';
import { CotizacionDTO } from '../../../models/cotizacion.dto';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css'
})
export class CotizacionComponent implements OnInit {
  cotizaciones: CotizacionDTO[] = [];
  mostrarModal = false;
  cotizacionSeleccionada?: CotizacionDTO;
  mostrarRegistrar = false;

  constructor(
    private service: CotizacionService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.firstChild?.params.subscribe(params => {
      this.mostrarRegistrar = !!params['id'];
    });
  }

  ngOnInit(): void {
    this.cargarCotizaciones();
  }

  cargarCotizaciones(): void {
    this.service.getAll().subscribe(data => (this.cotizaciones = data));
  }

  irANuevaCotizacion() {
    this.router.navigate(['/dashboard/logistica/requerimiento']);
  }

  verDetalle(c: CotizacionDTO): void {
    this.cotizacionSeleccionada = c;
    this.mostrarModal = true;
  }

  onCancelarRegistrar() {
    this.mostrarRegistrar = false;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  eliminar(id: number): void {
    this.service.delete(id).subscribe(() => this.cargarCotizaciones());
  }
}
