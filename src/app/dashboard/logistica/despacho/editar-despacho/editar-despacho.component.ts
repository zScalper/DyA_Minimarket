import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DespachoService } from '../../../../services/despacho.service';
import { TiendaService } from '../../../../services/tienda.service';
import { EstadoService } from '../../../../services/estado.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-despacho',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-despacho.component.html',
  styleUrls: ['./editar-despacho.component.css']
})
export class EditarDespachoComponent implements OnInit {
  despachoForm!: FormGroup;
  id!: number;
  tiendas: any[] = [];
  estados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private despachoService: DespachoService,
    private tiendaService: TiendaService,
    private estadoService: EstadoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];

    this.despachoForm = this.fb.group({
      fecha: ['', Validators.required],
      codTienda: [null, Validators.required],
      codEstado: [null, Validators.required]
    });

    this.tiendaService.getAll().subscribe(t => this.tiendas = t);
    this.estadoService.getAll().subscribe(e => this.estados = e.filter(e => e.id !== undefined && [7,8,9].includes(e.id)));
    this.despachoService.getById(this.id).subscribe(d => {
      this.despachoForm.patchValue({
        fecha: d.fecha,
        codTienda: d.codTienda?.id,
        codEstado: d.codEstado?.id
      });
    });
  }

  actualizar(): void {
    if (this.despachoForm.invalid) return;

    const despacho = {
      ...this.despachoForm.value,
      codTienda: { id: this.despachoForm.value.codTienda },
      codEstado: { id: this.despachoForm.value.codEstado }
    };

    this.despachoService.actualizar(this.id, despacho).subscribe(() => {
      alert('✅ Despacho actualizado correctamente');
      this.router.navigate(['/dashboard/logistica/despachos']);
    });
  }
}

