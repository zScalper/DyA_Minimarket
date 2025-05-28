import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuActivo = false;
  submenuActivo: { [key: string]: boolean } = { almacen: false, administracion: false, logistica: false };
  seccionActiva: string = '';

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }

  toggleSubmenu(section: string) {
    this.submenuActivo[section] = !this.submenuActivo[section];
  }

  setActiveSection(url: string) {
    this.seccionActiva = url;
  }
}

