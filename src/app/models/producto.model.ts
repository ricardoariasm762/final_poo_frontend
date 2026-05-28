export interface Producto {
  idProducto: number;
  nombre: string;
  precio: number;
}

export type ProductoCreateRequest = Omit<Producto, 'idProducto'>;
