import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, CommonModule], // Importa módulos necesarios para la vista
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menuActivo = false; // Controla si el sidebar está abierto o cerrado
  vistaActual: string = ''; // Guarda el nombre de la vista actual

  constructor(private router: Router) {
    // Al iniciar el componente, obtenemos la ruta actual para establecer el título de la vista
    this.vistaActual = this.getTituloVista(this.router.url.split('?')[0]);

    // Nos suscribimos a los eventos de navegación para actualizar la vista cuando cambia la ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rutaLimpia = event.urlAfterRedirects.split('?')[0];
        this.vistaActual = this.getTituloVista(rutaLimpia);
      }
    });
  }

  // Método para abrir/cerrar el menú lateral
  toggleSidebar() {
    this.menuActivo = !this.menuActivo;
  }

  // Método para cerrar el menú lateral
  cerrarSidebar() {
    this.menuActivo = false;
  }

  // Método que asigna nombres de vistas según la ruta actual
  getTituloVista(url: string): string {
    const rutas: { [key: string]: string } = {
      '/dashboard/inicio': 'Inicio',
      '/dashboard/almacen/inventario': 'Inventario',
      '/dashboard/almacen/ingreso-producto': 'Ingreso de Producto',
      '/dashboard/administracion/usuarios': 'Usuarios',
      '/dashboard/administracion/tipo-proveedor': 'Tipo de Proveedor',
      '/dashboard/logistica/requerimiento': 'Requerimiento',
      '/dashboard/logistica/cotizacion': 'Cotización',
      '/dashboard/logistica/orden-compra': 'Orden de Compra',
      '/dashboard/logistica/despacho': 'Despacho'
    };

    return rutas[url] || 'Dashboard'; // Retorna el nombre de la vista o un valor por defecto
  }
}
/* Este componente maneja la lógica del dashboard, incluyendo la navegación y el estado del sidebar
 y el título de la vista actual. Utiliza el Router de Angular para detectar cambios en la ruta*/