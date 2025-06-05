import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() menuActivo = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  submenuActivo: { [key: string]: boolean } = { almacen: false, administracion: false, logistica: false };
  seccionActiva: string = '';

  toggleSubmenu(section: string) {
    this.submenuActivo[section] = !this.submenuActivo[section];
  }

  setActiveSection(url: string) {
    this.seccionActiva = url;
  }
}

