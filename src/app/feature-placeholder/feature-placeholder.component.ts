import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-placeholder',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './feature-placeholder.component.html',
  styleUrl: './feature-placeholder.component.css'
})
export class FeaturePlaceholderComponent implements OnInit {
  title = 'Modulo en construccion';
  description = 'Esta vista estara disponible en una siguiente iteracion.';
  backRoute = '/clientes';

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'] ?? this.title;
    this.description = this.route.snapshot.data['description'] ?? this.description;
    this.backRoute = this.route.snapshot.data['backRoute'] ?? this.backRoute;
  }
}
