import { DetalleRequerimientoDTO } from "./detalleRequerimiento.dto";
import { EstadoDTO } from "./estado.dto";
import { UsuarioDTO } from "./usuario.dto";
export interface RequerimientoDTO {
  id: number;
  fecha: string; // en formato ISO: 'YYYY-MM-DD'
  detalles: DetalleRequerimientoDTO[];
  codEstado: EstadoDTO;
  codUsuario: UsuarioDTO;
}
