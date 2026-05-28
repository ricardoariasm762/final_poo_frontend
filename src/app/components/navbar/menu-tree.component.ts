import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-menu-tree',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <div class="space-y-xs">
      @for (item of items; track item.id) {
        <div>
          @if (item.route) {
            <a
              class="flex items-center gap-sm p-sm text-on-surface-variant hover:bg-white/[0.05] hover:text-on-surface rounded-xl transition-all cursor-pointer border border-transparent"
              [style.paddingLeft.rem]="basePadding + level * 0.75"
              [routerLink]="item.route"
              routerLinkActive="bg-white/[0.06] border-white/10 text-on-surface font-semibold"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              @if (item.icon) {
                <span class="material-symbols-outlined" [attr.data-icon]="item.icon">{{ item.icon }}</span>
              }
              <span class="font-label-lg text-label-lg">{{ item.label }}</span>
            </a>
          } @else {
            <div
              class="flex items-center gap-sm p-sm text-on-surface-variant rounded-xl border border-transparent"
              [style.paddingLeft.rem]="basePadding + level * 0.75"
            >
              @if (item.icon) {
                <span class="material-symbols-outlined" [attr.data-icon]="item.icon">{{ item.icon }}</span>
              }
              <span class="font-label-lg text-label-lg">{{ item.label }}</span>
            </div>
          }

          @if (item.children.length) {
            <app-menu-tree [items]="item.children" [level]="level + 1" />
          }
        </div>
      }
    </div>
  `
})
export class MenuTreeComponent {
  @Input({ required: true }) items: MenuItem[] = [];
  @Input() level = 0;
  basePadding = 0.5;
}

