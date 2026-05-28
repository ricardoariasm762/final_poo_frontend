export type EstadoEncuentro = 'PROGRAMADO' | 'EN_CURSO' | 'FINALIZADO' | 'SUSPENDIDO';

export interface Encuentro {
  id: number;
  torneoId: number;
  nombreTorneo: string;
  fase: string;
  localId: number;
  nombreLocal: string;
  visitanteId: number;
  nombreVisitante: string;
  estado: EstadoEncuentro;
  fechaProgramada: string;
  puntosLocal: number | null;
  puntosVisitante: number | null;
  setsLocal: number | null;
  setsVisitante: number | null;
}

export interface ResultadoRequest {
  puntosLocal: number;
  puntosVisitante: number;
  setsLocal?: number;
  setsVisitante?: number;
}