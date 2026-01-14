// src/app/app.component.ts
// Composant racine de l'application (point d'entrée visuel).

import { Component } from '@angular/core';

@Component({
  // standalone: false indique explicitement que ce composant appartient à un NgModule.
  standalone: false,
  selector: 'app-root', // Balise HTML principale utilisée dans index.html.
  templateUrl: './app.component.html', // Fichier de template associé.
  styleUrls: ['./app.component.css'], // Fichier(s) de styles associés.
})
export class AppComponent {
  // On pourrait ajouter des propriétés globales ici si nécessaire.
}

