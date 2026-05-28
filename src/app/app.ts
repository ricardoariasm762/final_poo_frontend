import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <div class="min-h-screen flex overflow-hidden bg-background">
      @if (!isAuthRoute) {
        <app-navbar />
      }
      <main [class.md:ml-64]="!isAuthRoute" class="flex-1 flex flex-col h-screen overflow-y-auto bg-background">
        @if (navError) {
          <div class="m-margin-desktop p-md bg-error-container text-on-error-container rounded-xl flex items-center gap-md">
            <span class="material-symbols-outlined" data-icon="error">error</span>
            <span>{{ navError }}</span>
          </div>
        }
        <router-outlet />
      </main>
    </div>
  `
})
export class App {
  isAuthRoute = false;
  navError = '';

  constructor(private router: Router, private auth: AuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationError)
    ).subscribe((event) => {
      if (event instanceof NavigationError) {
        const msg = (event.error as any)?.message || 'Error de navegación. Intenta recargar la página.';
        this.navError = `Error de navegación: ${msg}`;
        return;
      }

      this.navError = '';
      const url = this.router.url;
      this.isAuthRoute = url.includes('/login') || url.includes('/register');
      
      // Redirect admin from root to dashboard
      if (url === '/') {
        if (this.auth.isAdmin()) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/torneos']);
        }
      }
    });
  }
}
