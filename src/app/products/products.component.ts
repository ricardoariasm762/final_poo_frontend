import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from '../models/producto.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productos: Producto[] = [];
  loading = false;
  error = '';
  successMessage = '';

  constructor(
    private readonly productsService: ProductsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  private loadProductos(): void {
    this.loading = true;
    this.error = '';
    this.successMessage = '';
    this.productsService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }

        this.error = 'No se pudieron cargar los productos';
        this.loading = false;
      }
    });
  }

  createNewProduct(): void {
    this.router.navigate(['/productos/nuevo']);
  }

  editProduct(idProducto: number): void {
    this.router.navigate(['/productos/editar', idProducto]);
  }

  deleteProduct(idProducto: number, nombre: string): void {
    const confirmado = window.confirm(`¿Eliminar el producto "${nombre}"?`);
    if (!confirmado) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.productsService.deleteProducto(idProducto).subscribe({
      next: (mensaje) => {
        this.loading = false;
        this.successMessage = mensaje;
        this.loadProductos();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }

        this.loading = false;
        this.error = typeof error.error === 'string'
          ? error.error
          : 'No se pudo eliminar el producto';
      }
    });
  }
}
