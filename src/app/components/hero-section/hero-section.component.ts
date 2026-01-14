// src/app/components/hero-section/hero-section.component.ts
// Section héro avec titre attractif, tagline et statistiques.

import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
})
export class HeroSectionComponent {
  // Méthode simple pour faire défiler la page jusqu'à la grille de livres.
  scrollToBooks(): void {
    const el = document.getElementById('books-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

