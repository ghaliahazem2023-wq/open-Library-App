// src/app/components/explore/explore.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

interface ExploreBook {
  key: string;
  title: string;
  authors: string[];
  cover_id?: number;
  first_publish_year?: number;
}

@Component({
  selector: 'app-explore',
  standalone: false,
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent implements OnInit {
  public books: ExploreBook[] = [];
  public loading = false;
  public query = '';
  public message = '';

  private favoritesSet = new Set<string>();

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.loadBooks();
  }

  public loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (res: any) => {
        const works = res.works || [];
        this.books = works.map((w: any) => ({
          key: w.key,
          title: w.title || 'Untitled',
          authors: (w.authors || []).map((a: any) => a.name || '').filter(Boolean),
          cover_id: w.cover_id || w.cover_i,
          first_publish_year: w.first_publish_year,
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showMessage("Impossible de charger les livres.");
      },
    });
  }

  public search(): void {
    const q = this.query.trim();
    if (!q) {
      this.loadBooks();
      return;
    }

    this.loading = true;
    this.bookService.searchBooksByTitle(q).subscribe({
      next: (res: Book[]) => {
        this.books = (res || []).map((b: any) => ({
          key: b.key,
          title: b.title || 'Untitled',
          authors: (b as any).author_name || [],
          cover_id: (b as any).cover_id || (b as any).cover_i,
          first_publish_year: b.first_publish_year,
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.showMessage("Erreur lors de la recherche.");
      },
    });
  }

  public getCoverUrl(id?: number): string {
    if (!id) return 'https://via.placeholder.com/160x240?text=No+Cover';
    return `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
  }

  public getWorkId(key: string): string {
    if (!key) return '';
    return key.replace(/^\/works\//, '');
  }

  public goToDetail(book: ExploreBook): void {
    const id = this.getWorkId(book.key);
    if (!id) return;
    this.router.navigate(['/book', id]);
  }

  private loadFavorites(): void {
    try {
      const raw = localStorage.getItem('favorites');
      const arr = raw ? JSON.parse(raw) : [];
      this.favoritesSet = new Set((arr || []).map((b: any) => b.key));
    } catch (_e) {
      this.favoritesSet = new Set();
    }
  }

  public isFavorite(book: ExploreBook): boolean {
    return this.favoritesSet.has(book.key);
  }

  public toggleFavorite(book: ExploreBook): void {
    const key = book.key;
    const raw = localStorage.getItem('favorites');
    let arr = raw ? JSON.parse(raw) : [];

    if (this.favoritesSet.has(key)) {
      arr = arr.filter((b: any) => b.key !== key);
      this.favoritesSet.delete(key);
      this.showMessage('Retiré des favoris');
    } else {
      arr.push({ key: book.key, title: book.title, cover_id: book.cover_id });
      this.favoritesSet.add(key);
      this.showMessage('Ajouté aux favoris');
    }

    localStorage.setItem('favorites', JSON.stringify(arr));
  }

  private showMessage(txt: string, ms: number = 2200): void {
    this.message = txt;
    setTimeout(() => (this.message = ''), ms);
  }
}

