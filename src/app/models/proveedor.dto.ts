import { TipoProveedorDTO } from "./tipoProveedor.dto";

export interface ProveedorDTO {
  id?: number;
  razonSocial: string;
  direccion: string;
  codTipoProveedor: TipoProveedorDTO;  
}