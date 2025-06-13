import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() menuActivo: boolean = false; // Recibe el estado del menú desde el componente padre
  @Input() vistaActual: string = ''; // Recibe el nombre de la vista actual para mostrar en el encabezado
  @Output() toggleMenu = new EventEmitter<void>(); // Emite un evento para abrir/cerrar el menú desde el encabezado
}
