// src/main.ts
// Fichier d'entrée de l'application. Il démarre (bootstrap) le module principal.

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// platformBrowserDynamic().bootstrapModule(...) démarre AppModule,
// qui lui-même démarre AppComponent (défini dans app.module.ts).
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
