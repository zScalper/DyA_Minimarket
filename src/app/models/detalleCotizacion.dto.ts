import { FormaPagoDTO } from './formaPago.dto';
import { MonedaDTO } from './moneda.dto';
import { ProductoDTO } from './producto.dto';

export interface DetalleCotizacionDTO {
  id?: number;
  cantidad: number;
  precioUnitario: number;
  codProducto: ProductoDTO;
  codMoneda: MonedaDTO;
  codFormaPago: FormaPagoDTO;
}