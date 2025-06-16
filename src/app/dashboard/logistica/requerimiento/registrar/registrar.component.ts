import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registrar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {
  @Output() onGuardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      codProducto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  guardar() {
    if (this.formulario.valid) {
      this.onGuardar.emit(this.formulario.value);
      this.formulario.reset();
    }
  }
}
