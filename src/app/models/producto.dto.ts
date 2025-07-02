import { CategoriaDTO } from "./categoria.dto";
import { EstadoDTO } from "./estado.dto";
import { ProveedorDTO } from "./proveedor.dto";
import { UnidadDTO } from "./unidad.dto";
export interface ProductoDTO {
  id?: number;
  nombre: string;
  cantidad: number;
  precio: number;
  sku: string;
  codCategoria: CategoriaDTO;
  codUnidad: UnidadDTO;
  codEstado: EstadoDTO;
  codProveedor: ProveedorDTO;
}