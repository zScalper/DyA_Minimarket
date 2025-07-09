import { DespachoDTO } from './despacho.dto';
import { ProductoDTO } from './producto.dto';

export interface DetalleDespachoDTO {
  id?: number;
  cantidad: number;
  codProducto: ProductoDTO;
  codDespacho?: DespachoDTO; 
}