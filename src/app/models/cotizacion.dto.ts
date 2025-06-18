import { RequerimientoDTO } from "./requerimiento.dto";
import { DetalleCotizacionDTO } from "./detalleCotizacion.dto";
import { EstadoDTO } from "./estado.dto";

export interface CotizacionDTO {
  id: number;
  fecha: string; // en formato ISO: 'YYYY-MM-DD'
  fechaVencimiento: string; // en formato ISO: 'YYYY-MM-DD'
  codRequerimiento: RequerimientoDTO;
  detalles: DetalleCotizacionDTO[];
  codEstado: EstadoDTO;
}