// src/app/services/book.service.ts
// Ce service centralise tous les appels HTTP vers l'API OpenLibrary.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book';

// @Injectable permet à Angular d'injecter ce service dans des composants (dépendance).
@Injectable({
  // providedIn: 'root' signifie que le service est disponible partout dans l'application
  // sans avoir besoin de l'ajouter dans un module.
  providedIn: 'root',
})
export class BookService {
  // URL de base de l'API OpenLibrary.
  private readonly BASE_URL = 'https://openlibrary.org';

  // On injecte HttpClient dans le constructeur pour pouvoir faire des requêtes HTTP.
  constructor(private http: HttpClient) {}

  // 1️⃣ Récupération d'une liste de livres sur le sujet "computers".
  // Retourne un Observable<any> comme demandé dans l'énoncé.
  getBooks(): Observable<any> {
    const url = `${this.BASE_URL}/subjects/computers.json`;

    // this.http.get(...) renvoie un Observable sur lequel on pourra s'abonner (subscribe) dans les composants.
    return this.http.get<any>(url);
  }

  // 2️⃣ Récupération du détail d'un livre par son identifiant "work id".
  // Exemple d'URL : https://openlibrary.org/works/OL45883W.json
  getBookById(id: string): Observable<Book> {
    const url = `${this.BASE_URL}/works/${id}.json`;

    // On tape directement l'URL de l'API pour un work précis.
    // On tape `Book` comme type générique pour aider TypeScript,
    // même si l'API renvoie parfois des champs supplémentaires.
    return this.http.get<Book>(url);
  }

  // 3️⃣ Recherche par titre.
  // Utilise l'endpoint de recherche : https://openlibrary.org/search.json?title=angular
  searchBooksByTitle(title: string): Observable<Book[]> {
    const url = `${this.BASE_URL}/search.json?title=${encodeURIComponent(title)}`;

    // L'API renvoie un objet avec une propriété "docs" qui contient un tableau de résultats.
    // On utilise "pipe" + "map" pour transformer la réponse JSON brute en un tableau de "Book".
    return this.http.get<any>(url).pipe(
      map((response: any) => {
        // response.docs est un tableau d'objets livres version "search",
        // pas exactement la même forme que le /subjects, on adapte donc.
        return (response.docs || []).map((doc: any) => {
          const book: Book = {
            key: doc.key, // ex: "/works/OL45883W"
            title: doc.title,
            edition_count: doc.edition_count || 0,
            cover_id: doc.cover_i, // dans la recherche, la propriété s'appelle "cover_i"
            first_publish_year: doc.first_publish_year,
            subtitle: doc.subtitle,
            description: undefined, // la recherche ne renvoie pas de description détaillée
          };
          return book;
        });
      })
    );
  }

  // 4️⃣ Recherche par année de première publication.
  // Utilise le même endpoint, mais avec un filtre first_publish_year.
  searchBooksByYear(year: number): Observable<Book[]> {
    const url = `${this.BASE_URL}/search.json?first_publish_year=${year}`;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        return (response.docs || []).map((doc: any) => {
          const book: Book = {
            key: doc.key,
            title: doc.title,
            edition_count: doc.edition_count || 0,
            cover_id: doc.cover_i,
            first_publish_year: doc.first_publish_year,
            subtitle: doc.subtitle,
            description: undefined,
          };
          return book;
        });
      })
    );
  }
}

