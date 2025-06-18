import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  @Output() onGuardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  formulario!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      fecha: [this.hoy()],
      fechaVencimiento: [this.mañana(), Validators.required],
      codUsuario: [null, Validators.required],
      codEstado: [null, Validators.required],
      detalles: this.fb.array([this.nuevoDetalle()])
    });
  }
  nuevoDetalle(): FormGroup {
    return this.fb.group({
      codProducto: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [1, [Validators.required, Validators.min(0)]],
      codFormaPago: [null, Validators.required],
      codMoneda: [null, Validators.required]
    });
  }

  get detalles() {
    return this.formulario.get('detalles') as FormArray;
  }

  hoy(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate());
    return fecha.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
  }
  mañana(): string {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 1);
    return fecha.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
  }

  agregarDetalle(): void {
    this.detalles.push(this.nuevoDetalle());
  }

  eliminarDetalle(index: number): void {
    this.detalles.removeAt(index);
  }

  guardar() {
  this.marcarTodoTocado(this.formulario);
  if (this.formulario.valid) {
    this.onGuardar.emit(this.formulario.value);
    this.formulario.reset();
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
