import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MenuService } from '../menu.service';
import { OpcionMenuNode } from '../models/opcion.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {
  menuTree: OpcionMenuNode[] = [];
  loadingMenu = false;
  menuError = '';
  currentUrl = '';

  private readonly expandedIds = new Set<number>();

  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.loadMenu();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl = (event as NavigationEnd).urlAfterRedirects;
        this.expandActiveBranch(this.menuTree);
      });
  }

  trackById(_: number, item: OpcionMenuNode): number {
    return item.id;
  }

  isExpanded(node: OpcionMenuNode): boolean {
    return this.expandedIds.has(node.id) || this.hasActiveDescendant(node);
  }

  toggleNode(node: OpcionMenuNode): void {
    if (!node.children.length) {
      return;
    }

    if (this.expandedIds.has(node.id)) {
      this.expandedIds.delete(node.id);
      return;
    }

    this.expandedIds.add(node.id);
  }

  hasChildren(node: OpcionMenuNode): boolean {
    return node.children.length > 0;
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  isRouteActive(node: OpcionMenuNode): boolean {
    if (!node.ruta) {
      return false;
    }

    return this.currentUrl === node.ruta;
  }

  private loadMenu(): void {
    this.loadingMenu = true;
    this.menuError = '';

    this.menuService.getMenu().subscribe({
      next: (items) => {
        this.menuTree = items;
        this.expandActiveBranch(this.menuTree);
        this.loadingMenu = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loadingMenu = false;

        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
          return;
        }

        this.menuError = 'No se pudo cargar el menu lateral.';
      }
    });
  }

  private expandActiveBranch(nodes: OpcionMenuNode[]): boolean {
    let found = false;

    for (const node of nodes) {
      const childFound = this.expandActiveBranch(node.children);
      const selfFound = !!node.ruta && this.currentUrl === node.ruta;

      if (childFound || selfFound) {
        this.expandedIds.add(node.id);
        found = true;
      }
    }

    return found;
  }

  private hasActiveDescendant(node: OpcionMenuNode): boolean {
    return node.children.some((child) => this.isRouteActive(child) || this.hasActiveDescendant(child));
  }
}
