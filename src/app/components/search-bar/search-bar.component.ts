// src/app/components/search-bar/search-bar.component.ts
// Composant qui contient les champs de recherche (titre + année).

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  // standalone: false car ce composant est déclaré dans AppModule.
  standalone: false,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  // Propriété liée au champ de recherche par titre (two-way binding via [(ngModel)]).
  titleQuery: string = '';

  // Propriété liée au champ de recherche par année (two-way binding via [(ngModel)]).
  yearQuery: number | null = null;

  // @Output permet d'émettre un évènement vers le composant parent (ici BookList).
  // On envoie un objet contenant les 2 critères de recherche.
  @Output() search = new EventEmitter<{ title: string; year: number | null }>();

  // Méthode appelée au clic sur le bouton "Rechercher".
  onSearchClick(): void {
    // On "émet" un objet avec les valeurs actuelles des 2 champs.
    this.search.emit({
      title: this.titleQuery,
      year: this.yearQuery,
    });
  }
}

