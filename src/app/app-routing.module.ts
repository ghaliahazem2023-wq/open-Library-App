// src/app/app-routing.module.ts
// Module de routing principal de l'application.
// Il définit les différentes URL et les composants associés.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { ExploreComponent } from './components/explore/explore.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

// Tableau de routes de l'application.
const routes: Routes = [
  // Route racine : affiche la liste des livres.
  { path: '', component: BookListComponent },

  // Pages supplémentaires
  { path: 'explore', component: ExploreComponent },
  { path: 'favorites', component: FavoritesComponent },

  // Route pour le détail d'un livre : /book/:id
  { path: 'book/:id', component: BookDetailsComponent },

  // Route de secours : si l'URL ne correspond à rien, on redirige vers la racine.
  { path: '**', redirectTo: '' },
];

@NgModule({
  // forRoot configure le router pour toute l'application.
  imports: [RouterModule.forRoot(routes)],
  // On exporte RouterModule pour pouvoir utiliser <router-outlet> et routerLink dans les templates.
  exports: [RouterModule],
})
export class AppRoutingModule {}

