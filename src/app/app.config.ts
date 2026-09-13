import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideImageKitLoader } from '@angular/common';
import { PassService } from './features/concert-pass/domain/repository/pass_service';
import { PassServiceImpl } from './features/concert-pass/data/repository-impl/pass_service_impl';
import { API_URL } from './core/tokens';
import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideImageKitLoader('https://ik.imagekit.io/4dsph7lpq'),
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: PassService, useClass: PassServiceImpl }
  ]
}