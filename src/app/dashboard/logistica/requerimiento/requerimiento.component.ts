import { Component, OnInit } from '@angular/core';
import { RequerimientoDTO } from '../../../models/requerimiento.dto';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RequerimientoService } from '../../../services/requerimiento.service';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrarComponent } from './registrar/registrar.component';
@Component({
  selector: 'app-requerimiento',
  imports: [CommonModule, ReactiveFormsModule, RegistrarComponent],
  templateUrl: './requerimiento.component.html',
  styleUrl: './requerimiento.component.css'
})
export class RequerimientoComponent implements OnInit {

  requerimientos: RequerimientoDTO[] = [];
  formulario!: FormGroup;
  mostrarRegistrar = false;
  mostrarModal: boolean = false;
  requerimientoSeleccionado?: RequerimientoDTO;
  constructor(private service: RequerimientoService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.mostrarRegistrar = this.router.url.endsWith('/registrar');
    });
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      fecha: [''],
      detalles: [null],
      codUsuario: [null],
      codEstado: [null],
    });

    this.cargarRequerimientos();
  }

  cargarRequerimientos(): void {
    this.service.getAll().subscribe(data => this.requerimientos = data);
  }

  irANuevoRequerimiento() {
    this.router.navigate(['/dashboard/logistica/requerimiento/registrar']);
  }
  onCancelarRegistrar() {
    this.mostrarRegistrar = false;
  }
  editar(req: RequerimientoDTO): void {
    this.formulario.setValue(req);
  }

  eliminar(id: number): void {
    this.service.delete(id).subscribe(() => this.cargarRequerimientos());
  }
  verDetalle(r: RequerimientoDTO): void {
    this.requerimientoSeleccionado = r;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
