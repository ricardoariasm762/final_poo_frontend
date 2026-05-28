export type Genero = 'MASCULINO' | 'FEMENINO' | 'OTRO';

export type TipoIdentificacion = 'CC' | 'CE' | 'NIT' | 'TI';

export interface Cliente {
  idCliente: string;
  nombre: string;
  email: string;
  telefono?: string | null;
  direccion?: string | null;
  activo: boolean;
  numIdentificacion: string;
  genero?: Genero | null;
  tipoIdentificacion?: TipoIdentificacion | null;
}

export type ClienteCreateRequest = Omit<Cliente, 'idCliente'>;
