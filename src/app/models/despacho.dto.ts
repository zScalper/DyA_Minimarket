import { TiendaDTO } from './tienda.dto';
import { EstadoDTO } from './estado.dto';
import { UsuarioDTO } from './usuario.dto';
import { DetalleDespachoDTO } from './detalleDespacho.dto';

export interface DespachoDTO {
  id?: number;
  fecha: string; // Formato ISO: YYYY-MM-DD
  codEstado: EstadoDTO;
  codTienda: TiendaDTO;
  codUsuario?: UsuarioDTO; 
  detalles: DetalleDespachoDTO[];
}
