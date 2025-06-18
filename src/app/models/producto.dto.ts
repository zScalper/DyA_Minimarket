import { EstadoDTO } from "./estado.dto";
export interface ProductoDTO {
  id?: number;
  nombre: string;
  codCategoria: number;
  codUnidad: number;
  cantidad: number;
  precio: number;
  codEstado: EstadoDTO;
  codProveedor: number;
}