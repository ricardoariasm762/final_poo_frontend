import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../models/menu-item.model';
import { MenuTreeComponent } from './menu-tree.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuTreeComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  menu: MenuItem[] = [];
  menuLoading = false;
  menuError = '';

  constructor(public auth: AuthService, private menuService: MenuService) {}

  ngOnInit(): void {
    this.cargarMenu();
  }

  cargarMenu(): void {
    if (!this.auth.isLoggedIn()) {
      this.menu = [];
      return;
    }

    this.menuLoading = true;
    this.menuError = '';
    this.menuService.getMenu().subscribe({
      next: (items) => {
        this.menu = items || [];
        this.menuLoading = false;
      },
      error: () => {
        this.menuError = 'No se pudo cargar el menú';
        this.menuLoading = false;
      }
    });
  }

  logout(): void {
    this.auth.logout();
  }
}
