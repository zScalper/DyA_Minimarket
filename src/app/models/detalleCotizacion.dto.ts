import { FormaPagoDTO } from './formaPago.dto';
import { MonedaDTO } from './moneda.dto';
import { ProductoDTO } from './producto.dto';

export interface DetalleCotizacionDTO {
    id?: number;
    codProducto: ProductoDTO;
    cantidad: number;
    precio: number;
    codFormaPago: FormaPagoDTO;
    codMoneda: MonedaDTO;
}