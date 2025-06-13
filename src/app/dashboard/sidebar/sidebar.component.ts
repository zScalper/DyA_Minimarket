import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() menuActivo = false; // Recibe del componente padre si el menú está activo o no
  @Output() toggleSidebar = new EventEmitter<void>(); // Emite eventos al padre para abrir/cerrar el sidebar

  // Controla el estado de los submenús dentro del sidebar
  submenuActivo: { [key: string]: boolean } = { almacen: false, administracion: false, logistica: false };

  // Almacena la sección activa para resaltar visualmente el menú seleccionado
  seccionActiva: string = '';

  // Método para cerrar el sidebar cuando la pantalla es pequeña
  cerrarSidebar() {
    if (window.innerWidth <= 768) {
      this.toggleSidebar.emit(); // Envía el evento al componente padre para cerrar el menú
    }
  }
}