import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,SidebarComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  menuActivo = false;
  vistaActual: string = '';
  constructor(private router: Router) {
    // Inicializamos "vistaActual" con la ruta actual al cargar el componente
    this.vistaActual = this.getTituloVista(this.router.url.split('?')[0]);
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rutaLimpia = event.urlAfterRedirects.split('?')[0]; 
        this.vistaActual = this.getTituloVista(rutaLimpia); 
      }
    });
  }
  toggleMenu() {
    this.menuActivo = !this.menuActivo;
  }
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

    return rutas[url] || 'Dashboard'; // Valor por defecto si no se encuentra la ruta
  }
}
