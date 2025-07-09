import { DepartamentoDTO } from "./departamento.dto";
import { DistritoDTO } from "./distrito.dto";
import { ProvinciaDTO } from "./provincia.dto";


export interface TiendaDTO {
    id?: number;
    nombre?: string;
    direccion?: string;
    telefono?: string;
    codDepartamento?: DepartamentoDTO; 
    codProvincia?: ProvinciaDTO; 
    codDistrito?: DistritoDTO; 
}