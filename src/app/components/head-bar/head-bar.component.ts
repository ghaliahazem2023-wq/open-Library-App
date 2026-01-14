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
  // Propriété titre utilisée dans le template pour afficher le nom de l'application.
  appTitle: string = 'Open Library App';
}

