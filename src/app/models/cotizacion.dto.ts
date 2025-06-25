import { RequerimientoDTO } from "./requerimiento.dto";
import { DetalleCotizacionDTO } from "./detalleCotizacion.dto";
import { EstadoDTO } from "./estado.dto";

export interface CotizacionDTO {
  id?: number;
  fecha: string;
  fechaVencimiento: string;
  codEstado: EstadoDTO;
  codRequerimiento: RequerimientoDTO;
  detalles: DetalleCotizacionDTO[];
}