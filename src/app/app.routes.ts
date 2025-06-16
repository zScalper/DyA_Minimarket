import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AlmacenComponent } from './dashboard/almacen/almacen.component';
import { AdministracionComponent } from './dashboard/administracion/administracion.component';
import { LogisticaComponent } from './dashboard/logistica/logistica.component';
import { InventarioComponent } from './dashboard/almacen/inventario/inventario.component';
import { IngresoProductoComponent } from './dashboard/almacen/ingreso-producto/ingreso-producto.component';
import { UsuariosComponent } from './dashboard/administracion/usuarios/usuarios.component';
import { TipoProveedorComponent } from './dashboard/administracion/tipo-proveedor/tipo-proveedor.component';
import { RequerimientoComponent } from './dashboard/logistica/requerimiento/requerimiento.component';
import { CotizacionComponent } from './dashboard/logistica/cotizacion/cotizacion.component';
import { OrdenCompraComponent } from './dashboard/logistica/orden-compra/orden-compra.component';
import { DespachoComponent } from './dashboard/logistica/despacho/despacho.component';
import { AuthGuard } from './auth/auth.guard';
import { ListarComponent } from './dashboard/administracion/usuarios/listar/listar.component';
import { AgregarComponent } from './dashboard/administracion/usuarios/agregar/agregar.component';
import { EditarComponent } from './dashboard/administracion/usuarios/editar/editar.component';
// Configuración de rutas en Angular
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirección a la pantalla de login

    // Rutas dentro del dashboard, organizadas por módulos (almacén, administración, logística)
    {
        path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'full' }, // Redirección dentro del dashboard
            { path: 'inicio', component: HomeComponent },

            {
                path: 'almacen', component: AlmacenComponent, children: [
                    { path: '', redirectTo: 'inventario', pathMatch: 'full' },
                    { path: 'inventario', component: InventarioComponent },
                    { path: 'ingreso-producto', component: IngresoProductoComponent }
                ]
            },

            {
                path: 'administracion', component: AdministracionComponent, children: [
                    { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
                    {
                        path: 'usuarios',
                        component: UsuariosComponent,
                        children: [
                            { path: '', redirectTo: 'listar', pathMatch: 'full' },
                            { path: 'listar', component: ListarComponent },
                            { path: 'agregar', component: AgregarComponent },
                            { path: 'editar/:id', component: EditarComponent }
                        ]
                    },
                    { path: 'tipo-proveedor', component: TipoProveedorComponent }
                ]
            },

            {
                path: 'logistica', component: LogisticaComponent, children: [
                    { path: '', redirectTo: 'requerimiento', pathMatch: 'full' },
                    { path: 'requerimiento', component: RequerimientoComponent },
                    { path: 'cotizacion', component: CotizacionComponent },
                    { path: 'orden-compra', component: OrdenCompraComponent },
                    { path: 'despacho', component: DespachoComponent }
                ]
            }
        ]
    },
    { path: '**', redirectTo: 'login' } // Redirigir a login si intentan acceder sin autenticación
];
