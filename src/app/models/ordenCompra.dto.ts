import { CotizacionDTO } from './cotizacion.dto';

export interface OrdenCompraDTO {
  id?: number;
  fecha: string;
  montoTotal: number;
  codCotizacion: CotizacionDTO;
}
