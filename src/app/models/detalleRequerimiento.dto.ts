import { ProductoDTO } from './producto.dto';
export interface DetalleRequerimientoDTO {
    id: number;
    codProducto: ProductoDTO;
    cantidad: number;
    idRequerimiento: number;
}