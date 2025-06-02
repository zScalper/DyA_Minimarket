import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuActivo = false;
  submenuActivo: { [key: string]: boolean } = { almacen: false, administracion: false, logistica: false };
  seccionActiva: string = '';
  vistaActual: string = 'Dashboard'; // Texto por defecto

  constructor(private router: Router) {
    // Detectar cambios en la URL para actualizar la vista actual
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.vistaActual = this.getTituloVista(event.url);
      }
    });
  }

  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }

  toggleSubmenu(section: string) {
    this.submenuActivo[section] = !this.submenuActivo[section];
  }

  setActiveSection(url: string) {
    this.seccionActiva = url;
  }
  getTituloVista(url: string): string {
    const rutas: { [key: string]: string } = { // Agregamos la firma de índice
      '/dashboard/inicio': 'Inicio',
      '/dashboard/almacen/inventario': 'Inventario',
      '/dashboard/almacen/ingreso-producto': 'Ingreso de Producto',
      '/dashboard/administracion/usuarios': 'Usuarios',
      '/dashboard/administracion/tipo-proveedor': 'Tipo de Proveedor'
    };

    return rutas[url] || 'Dashboard'; // Ahora TypeScript reconoce el índice
  }
}

