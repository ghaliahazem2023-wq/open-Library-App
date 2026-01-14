// src/app/app.module.ts
// Module racine de l'application, qui déclare les composants et importe les modules nécessaires.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeadBarComponent } from './components/head-bar/head-bar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';

@NgModule({
  // Déclaration de tous les composants utilisés dans ce module.
  declarations: [
    AppComponent,
    HeadBarComponent,
    SearchBarComponent,
    BookListComponent,
    BookDetailsComponent,
  ],
  // Import des autres modules nécessaires.
  imports: [
    BrowserModule, // Nécessaire pour démarrer une application Angular dans le navigateur.
    HttpClientModule, // Permet d'utiliser HttpClient pour les requêtes HTTP.
    FormsModule, // Nécessaire pour utiliser [(ngModel)] dans les formulaires.
    AppRoutingModule, // Module qui contient la configuration des routes.
  ],
  providers: [],
  // Composant de démarrage (bootstrapped) de l'application.
  bootstrap: [AppComponent],
})
export class AppModule {}

