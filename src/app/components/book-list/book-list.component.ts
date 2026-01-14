// src/app/components/book-list/book-list.component.ts
// Ce composant affiche une liste de livres et gère les recherches.

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  // standalone: false car ce composant est déclaré dans AppModule.
  standalone: false,
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  // Tableau contenant les livres à afficher.
  booksList: Book[] = [];

  // Indique si les données sont en cours de chargement.
  isLoading: boolean = false;

  // Message d'erreur éventuel à afficher.
  errorMessage: string | null = null;

  constructor(
    // On injecte le service qui s'occupe des appels HTTP.
    private bookService: BookService,
    // On injecte le Router pour pouvoir naviguer vers la page de détails.
    private router: Router
  ) {}

  // Méthode du cycle de vie Angular appelée au chargement du composant.
  ngOnInit(): void {
    // Au démarrage, on charge la liste "par défaut" (sujet computers).
    this.loadDefaultBooks();
  }

  // Charge la liste de livres par défaut via le sujet "computers".
  loadDefaultBooks(): void {
    this.isLoading = true; // on indique que le chargement commence.
    this.errorMessage = null; // on réinitialise un éventuel ancien message d'erreur.

    this.bookService.getBooks().subscribe({
      // "next" est appelé quand la réponse arrive correctement.
      next: (data) => {
        // L'API /subjects renvoie les livres dans la propriété "works".
        this.booksList = data.works || [];
        this.isLoading = false;
      },
      // "error" est appelé en cas d'erreur HTTP.
      error: (error) => {
        console.error('Erreur lors du chargement des livres', error);
        this.errorMessage = 'Impossible de charger les livres. Veuillez réessayer plus tard.';
        this.isLoading = false;
      },
    });
  }

  // Méthode appelée quand le composant SearchBar émet un évènement "search".
  onSearch(criteria: { title: string; year: number | null }): void {
    const { title, year } = criteria;

    // Si aucun critère n'est rempli, on recharge la liste par défaut.
    if (!title && !year) {
      this.loadDefaultBooks();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    // Si les deux filtres sont remplis, on préfère la recherche par titre + année.
    // Pour simplifier, on appelle d'abord la recherche par titre,
    // puis on filtre localement sur l'année.
    if (title && year) {
      this.bookService.searchBooksByTitle(title).subscribe({
        next: (books) => {
          this.booksList = books.filter((b) => b.first_publish_year === year);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche', error);
          this.errorMessage = 'Erreur lors de la recherche.';
          this.isLoading = false;
        },
      });
      return;
    }

    // Recherche uniquement par titre.
    if (title) {
      this.bookService.searchBooksByTitle(title).subscribe({
        next: (books) => {
          this.booksList = books;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche par titre', error);
          this.errorMessage = 'Erreur lors de la recherche par titre.';
          this.isLoading = false;
        },
      });
      return;
    }

    // Recherche uniquement par année.
    if (year) {
      this.bookService.searchBooksByYear(year).subscribe({
        next: (books) => {
          this.booksList = books;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la recherche par année', error);
          this.errorMessage = 'Erreur lors de la recherche par année.';
          this.isLoading = false;
        },
      });
    }
  }

  // Construit l'URL de l'image de couverture à partir du cover_id.
  // Si cover_id est absent, on retourne une image de remplacement.
  getCoverUrl(book: Book): string {
    if (book.cover_id) {
      // URL demandée dans l'énoncé : https://covers.openlibrary.org/b/id/${cover_id}-M.jpg
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`;
    }
    // Image neutre si pas de couverture.
    return 'https://via.placeholder.com/128x193?text=No+Cover';
  }

  // Navigation vers la page de détails au clic sur un livre.
  goToDetails(book: Book): void {
    // La clé renvoyée par l'API ressemble à "/works/OL45883W".
    // On extrait seulement la dernière partie après le dernier "/".
    const workId = book.key.split('/').pop();

    if (workId) {
      // On navigue vers l'URL /book/:id grâce au router.
      this.router.navigate(['/book', workId]);
    }
  }
}

