import { TipoProveedorDTO } from "./tipoProveedor.dto";

export interface ProveedorDTO {
  id?: number;
  ruc: string;
  razonSocial: string;
  direccion: string;
  codTipo?: TipoProveedorDTO;  
}