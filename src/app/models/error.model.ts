export interface ErrorResponse {
  status: number;
  error: string;
  mensaje: string;
  timestamp: string;
  detalles?: string[];
}