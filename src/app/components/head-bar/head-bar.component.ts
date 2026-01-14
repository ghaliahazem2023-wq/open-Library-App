// src/app/components/head-bar/head-bar.component.ts
// Composant très simple qui affiche le titre de l'application.

import { Component } from '@angular/core';

@Component({
  // standalone: false indique que ce composant sera déclaré dans un NgModule.
  standalone: false,
  selector: 'app-head-bar', // Nom de la balise HTML que l'on utilisera dans les templates.
  templateUrl: './head-bar.component.html', // Fichier HTML associé.
  styleUrls: ['./head-bar.component.css'], // Fichier(s) CSS associé(s).
})
export class HeadBarComponent {
  isMobileNavOpen: boolean = false;
  isDownloadOpen: boolean = false;
  isDownloading: boolean = false;
  isUserMenuOpen: boolean = false;
  // Etat local pour le mode sombre / clair (true = sombre).
  isDarkMode: boolean = true;

  constructor() {
    // Au chargement, on peut récupérer la préférence stockée plus tard (optionnel pour l'instant).
  }

  // Bascule entre sombre et clair (ici uniquement visuel, sans logique complexe).
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  toggleDownloadMenu(): void {
    this.isDownloadOpen = !this.isDownloadOpen;
  }

  exportCurrentList(): void {
    // Logique pour exporter la liste actuelle
  }

  exportFavorites(): void {
    // Logique pour exporter les favoris
  }

  downloadBookPlaceholder(): void {
    // Logique pour télécharger un livre de remplacement
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    // Logique pour la déconnexion
  }
}

