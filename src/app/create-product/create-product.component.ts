import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoCreateRequest } from '../models/producto.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  successMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly productsService: ProductsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      precio: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
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

    this.productsService.createProducto(payload).subscribe({
      next: (producto) => {
        this.loading = false;
        this.successMessage = `Producto "${producto.nombre}" creado exitosamente`;
        setTimeout(() => this.router.navigate(['/productos']), 1500);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }

        this.loading = false;
        this.error = 'No se pudo crear el producto.';
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/productos']);
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get precio() {
    return this.form.get('precio');
  }
}
