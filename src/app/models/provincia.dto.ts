import { DepartamentoDTO } from "./departamento.dto";

export interface ProvinciaDTO {
  id?: number;
  nombre: string;
  codDepartamento?: DepartamentoDTO; 
}