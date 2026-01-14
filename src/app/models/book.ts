// src/app/models/book.ts
// Ce fichier définit le "modèle" Book que nous allons utiliser partout dans l'application.

// On utilise "export interface" pour décrire la forme (structure) d'un objet livre.
// Cela permet à TypeScript de vérifier que les données que l'on manipule ont bien ces propriétés.
export interface Book {
  // "key" est l'identifiant unique du livre renvoyé par l'API OpenLibrary (ex: "/works/OL12345W").
  key: string;

  // "title" est le titre principal de l'ouvrage.
  title: string;

  // "edition_count" est le nombre d'éditions différentes du même ouvrage.
  edition_count: number;

  // "cover_id" est l'identifiant utilisé pour construire l'URL de l'image de couverture.
  cover_id: number;

  // "first_publish_year" correspond à l'année de première publication.
  first_publish_year: number;

  // "subtitle" est optionnel (noté avec "?") car il n'est pas toujours présent dans les données de l'API.
  subtitle?: string;

  // "description" est aussi optionnel, certains livres n'ont pas de description détaillée.
  description?: string;
}

