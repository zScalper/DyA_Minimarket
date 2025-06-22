import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RequerimientoService } from '../../../../services/requerimiento.service';
import { RequerimientoDTO } from '../../../../models/requerimiento.dto';
@Component({
  selector: 'app-registrar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  @Output() onGuardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  formulario!: FormGroup;

  constructor(private fb: FormBuilder, private requerimientoService: RequerimientoService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      fecha: [this.hoy()],
      codUsuario: [null, Validators.required],
      codEstado: [null, Validators.required],
      detalles: this.fb.array([this.nuevoDetalle()])
    });
  }
  nuevoDetalle(): FormGroup {
    return this.fb.group({
      codProducto: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  get detalles() {
    return this.formulario.get('detalles') as FormArray;
  }

  hoy(): string {
    const fecha = new Date();
    return fecha.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
  }

  agregarDetalle(): void {
    this.detalles.push(this.nuevoDetalle());
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  guardar() {
    if (this.formulario.valid) {
      const req: RequerimientoDTO = this.formulario.value;
      this.requerimientoService.create(req).subscribe({
        next: (res) => {
          // Maneja éxito (puedes navegar, mostrar mensaje, etc.)
        },
        error: (err) => {
          // Maneja error
        }
      });
    }
  }

private marcarTodoTocado(formGroup: FormGroup | FormArray) {
  Object.values(formGroup.controls).forEach(control => {
    if (control instanceof FormGroup || control instanceof FormArray) {
      this.marcarTodoTocado(control);
    } else {
      control.markAsTouched();
    }
  });
}
}
