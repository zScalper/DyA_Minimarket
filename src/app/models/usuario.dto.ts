import { RolDTO } from './rol.dto';

export interface UsuarioDTO {
  id?: number; // opcional en creación
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  dni: string;
  password?: string; // opcional en actualizaciones
  rol?: RolDTO;
}
