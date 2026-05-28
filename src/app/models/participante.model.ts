export interface EquipoFutbol {
  id: number;
  nombre: string;
  ciudad: string;
  entrenador: string;
  estadio: string;
  colorCamiseta: string;
  numeroPlantel: number;
}

export interface EquipoFutbolRequest {
  nombre: string;
  ciudad: string;
  entrenador: string;
  estadio: string;
  colorCamiseta: string;
  numeroPlantel: number;
}

export interface EquipoBaloncesto {
  id: number;
  nombre: string;
  ciudad: string;
  entrenador: string;
  cancha: string;
  conferencia: string;
  numeroPlantel: number;
}

export interface EquipoBaloncestoRequest {
  nombre: string;
  ciudad: string;
  entrenador: string;
  cancha: string;
  conferencia: string;
  numeroPlantel: number;
}

export interface JugadorTenis {
  id: number;
  nombre: string;
  ciudad: string;
  entrenador: string;
  nacionalidad: string;
  ranking: number;
  manoHabil: string;
}

export interface JugadorTenisRequest {
  nombre: string;
  ciudad: string;
  entrenador: string;
  nacionalidad: string;
  ranking: number;
  manoHabil: string;
}