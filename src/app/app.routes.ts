import { Routes } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { LoginComponent } from './login/login.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FeaturePlaceholderComponent } from './feature-placeholder/feature-placeholder.component';
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'clientes' },
      { path: 'clientes', component: ClientsComponent },
      { path: 'clientes/nuevo', component: CreateClientComponent },
      { path: 'clientes/editar', redirectTo: 'clientes' },
      { path: 'clientes/eliminar', redirectTo: 'clientes' },
      { path: 'clientes/editar/:id', component: EditClientComponent },
      { path: 'productos', component: ProductsComponent },
      { path: 'productos/nuevo', component: CreateProductComponent },
      { path: 'productos/editar', redirectTo: 'productos' },
      { path: 'productos/eliminar', redirectTo: 'productos' },
      { path: 'productos/editar/:id', component: EditProductComponent },
      {
        path: 'productos/categorias',
        component: FeaturePlaceholderComponent,
        data: {
          title: 'Categorias de productos',
          description: 'Este nivel del menu ya navega correctamente y puede conectarse a un modulo futuro de categorias.',
          backRoute: '/productos'
        }
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
