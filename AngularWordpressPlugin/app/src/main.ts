import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import 'zone.js';

// Bootstrap AppComponent
bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      provideExperimentalZonelessChangeDetection(),
      provideHttpClient(withFetch()),
      provideRouter(routes),
    //   provideZoneChangeDetection({ ignoreChangesOutsideZone: true })
    ]
  })
  .catch((err) => console.error(err));