// src/app/components/favorites/favorites.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent implements OnInit {
  public items: any[] = [];
  public message = '';
  public loading = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    try {
      const raw = localStorage.getItem('favorites');
      this.items = raw ? JSON.parse(raw) : [];
    } catch (_e) {
      this.items = [];
    }
  }

  public remove(item: any): void {
    this.items = this.items.filter((i) => i.key !== item.key);
    localStorage.setItem('favorites', JSON.stringify(this.items));
    this.showMessage('Favori supprimé');
  }

  public exportFavorites(): void {
    if (!this.items || this.items.length === 0) {
      this.showMessage('Aucun favori à exporter');
      return;
    }
    const rows = this.items.map((b) => ({ title: b.title || '', key: b.key || '' }));
    const csv = this.toCSV(rows);
    this.downloadBlob('favorites.csv', csv, 'text/csv;charset=utf-8;');
    this.showMessage('Export terminé');
  }

  public downloadBook(item: any): void {
    this.loading = true;
    setTimeout(() => {
      const blob = new Blob([`PDF placeholder for ${item.title}`], { type: 'application/pdf' });
      this.downloadBlob(`${(item.title || 'book').replace(/\s+/g, '-')}.pdf`, blob);
      this.loading = false;
    }, 900);
  }

  public goToDetail(item: any): void {
    const id = (item.key || '').replace(/^\/works\//, '');
    if (!id) return;
    this.router.navigate(['/book', id]);
  }

  private toCSV(rows: any[]): string {
    if (!rows || rows.length === 0) return '';
    const keys = Object.keys(rows[0]);
    const header = keys.join(',');
    const escape = (v: any) => '"' + String(v || '').replace(/"/g, '""') + '"';
    const data = rows.map((r: any) => keys.map((k) => escape(r[k])).join(',')).join('\n');
    return `${header}\n${data}`;
  }

  private downloadBlob(filename: string, data: any, mime?: string): void {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mime || 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private showMessage(txt: string, ms: number = 2000): void {
    this.message = txt;
    setTimeout(() => (this.message = ''), ms);
  }
}
