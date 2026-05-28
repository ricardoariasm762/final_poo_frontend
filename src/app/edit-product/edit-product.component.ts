import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductoCreateRequest } from '../models/producto.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  form!: FormGroup;
  productId: number | null = null;
  loading = false;
  loadingProduct = false;
  error = '';
  successMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly productsService: ProductsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      precio: [null, [Validators.required, Validators.min(0)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    const parsedId = Number(idParam);

    if (!idParam || Number.isNaN(parsedId)) {
      this.error = 'El ID del producto no es válido.';
      return;
    }

    this.productId = parsedId;
    this.loadProduct(parsedId);
  }

  private loadProduct(id: number): void {
    this.loadingProduct = true;
    this.error = '';

    this.productsService.getProductoById(id).subscribe({
      next: (producto: Producto) => {
        this.form.patchValue({
          nombre: producto.nombre,
          precio: producto.precio
        });
        this.loadingProduct = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loadingProduct = false;
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }
        this.error = typeof error.error === 'string' ? error.error : 'No se pudo cargar el producto.';
      }
    });
  }

  onSubmit(): void {
    if (!this.productId || this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    const payload: ProductoCreateRequest = {
      nombre: this.form.value.nombre,
      precio: Number(this.form.value.precio)
    };

    this.productsService.updateProducto(this.productId, payload).subscribe({
      next: (producto) => {
        this.loading = false;
        this.successMessage = `Producto "${producto.nombre}" actualizado exitosamente`;
        setTimeout(() => this.router.navigate(['/productos']), 1200);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }
        this.error = typeof error.error === 'string' ? error.error : 'No se pudo actualizar el producto.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/productos']);
  }

  deleteProduct(): void {
    if (!this.productId) {
      return;
    }

    const nombre = this.form.value.nombre ?? '';
    const confirmado = window.confirm(`¿Eliminar el producto "${nombre}"?`);
    if (!confirmado) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.successMessage = '';

    this.productsService.deleteProducto(this.productId).subscribe({
      next: (mensaje) => {
        this.loading = false;
        this.successMessage = mensaje;
        setTimeout(() => this.router.navigate(['/productos']), 800);
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }
        this.error = typeof error.error === 'string' ? error.error : 'No se pudo eliminar el producto.';
      }
    });
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get precio() {
    return this.form.get('precio');
  }
}
