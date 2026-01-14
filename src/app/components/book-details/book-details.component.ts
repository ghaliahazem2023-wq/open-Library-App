// src/app/components/book-details/book-details.component.ts
// Ce composant affiche les détails d'un livre sélectionné.

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

@Component({
  // standalone: false car ce composant appartient à AppModule.
  standalone: false,
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  // Le livre courant (peut être null pendant le chargement).
  book: Book | null = null;

  // Indicateur de chargement.
  isLoading: boolean = false;

  // Message d'erreur éventuel.
  errorMessage: string | null = null;

  constructor(
    // ActivatedRoute permet de lire les paramètres de l'URL (ex: /book/:id).
    private route: ActivatedRoute,
    // Service pour appeler l'API.
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // On récupère l'identifiant depuis l'URL au chargement du composant.
    // paramMap est une Map des paramètres de route.
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadBookDetails(id);
    } else {
      this.errorMessage = 'Identifiant de livre manquant dans l’URL.';
    }
  }

  // Appel au service pour récupérer les détails du livre.
  loadBookDetails(id: string): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        // L'API de détail peut renvoyer des champs légèrement différents.
        // On "mappe" au minimum les champs que l'on veut afficher.
        this.book = {
          key: data.key,
          title: data.title,
          edition_count: (data as any).edition_count || 0,
          cover_id: (data as any).covers ? (data as any).covers[0] : 0,
          first_publish_year: (data as any).first_publish_year,
          subtitle: (data as any).subtitle,
          // La description peut être soit une chaîne, soit un objet { value: '...' }.
          description:
            typeof (data as any).description === 'string'
              ? (data as any).description
              : (data as any).description?.value,
        };

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du détail du livre', error);
        this.errorMessage = 'Impossible de charger les détails du livre.';
        this.isLoading = false;
      },
    });
  }

  // Construit l'URL de couverture si disponible.
  getCoverUrl(): string | null {
    if (this.book && this.book.cover_id) {
      return `https://covers.openlibrary.org/b/id/${this.book.cover_id}-L.jpg`;
    }
    return null;
  }
}

