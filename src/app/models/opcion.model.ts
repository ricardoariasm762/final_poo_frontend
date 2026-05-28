export interface OpcionMenuNode {
  id: number;
  nombre: string;
  ruta: string | null;
  children: OpcionMenuNode[];
}
