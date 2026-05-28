export type TipoDeporte = 'FUTBOL' | 'BALONCESTO' | 'TENIS';
export type EstadoTorneo = 'INSCRIPCIONES' | 'FASE_GRUPOS' | 'ELIMINACION' | 'FINALIZADO';
export type FormatoTorneo = 'FASE_GRUPOS_Y_ELIMINACION';

export interface Torneo {
  id: number;
  nombre: string;
  deporte: TipoDeporte;
  estado: EstadoTorneo;
  formato: FormatoTorneo;
  fechaInicio: string;
  fechaFin: string;
  cantidadGrupos: number;
  clasificadosPorGrupo: number;
}

export interface TorneoRequest {
  nombre: string;
  deporte: TipoDeporte;
  fechaInicio: string;
  fechaFin: string;
  cantidadGrupos: number;
  clasificadosPorGrupo: number;
}

export interface FaseGruposRequest {
  grupos: { [grupo: string]: number[] };
}