import { ProvinciaDTO } from "./provincia.dto";

export interface DistritoDTO {
  id?: number;
  nombre: string;
  codProvincia?: ProvinciaDTO; // ID de la provincia a la que pertenece
}