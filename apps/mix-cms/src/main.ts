import { APP_BASE_HREF } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { enableProdMode, importProvidersFrom, Injectable } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  AuthInterceptor,
  BASE_URL,
  DOMAIN_URL,
  GET_APP_URL,
  GET_THEME_URL,
  MixModalModule
} from '@mix/mix.share';
import { HotToastModule } from '@ngneat/hot-toast';
import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule
} from '@ngneat/transloco';
import { FormlyModule } from '@ngx-formly/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TuiEditorModule } from '@taiga-ui/addon-editor';
import {
  TUI_ANIMATIONS_DURATION,
  TUI_NOTIFICATION_DEFAULT_OPTIONS,
  TUI_NOTIFICATION_OPTIONS,
  TuiAlertModule,
  TuiDialogModule
} from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppComponent } from './app/app.component';
import { app_routes } from './app/app.routes';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: BASE_URL,
      useValue: environment.baseUrl
    },
    {
      provide: DOMAIN_URL,
      useValue: environment.domainUrl
    },
    {
      provide: GET_THEME_URL,
      useValue: environment.getThemeUrl
    },
    {
      provide: GET_APP_URL,
      useValue: environment.getThemeUrl
    },
    {
      provide: HTTP_INTERCEPTORS,

      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'This field is required',
        email: 'Pleas enter a valid email',
        confirm: 'Password confirm incorrect'
      }
    },
    {
      provide: TUI_ANIMATIONS_DURATION,
      useValue: 150
    },
    {
      provide: TUI_NOTIFICATION_OPTIONS,
      useValue: {
        ...TUI_NOTIFICATION_DEFAULT_OPTIONS,
        autocloseTimeout: 7000
      }
    },
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production
      })
    },
    {
      provide: APP_BASE_HREF,
      useValue: (window as any)['_app_base-route']
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        registrationStrategy: 'registerWhenStable:30000'
      }),
      NgxChartsModule,
      BrowserAnimationsModule,
      HttpClientModule,
      TuiAlertModule,
      TuiDialogModule,
      TuiEditorModule,
      MixModalModule,
      TranslocoModule,
      MonacoEditorModule.forRoot(),
      FormlyModule.forRoot(),
      HotToastModule.forRoot()
    ),
    provideRouter(
      app_routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })
    )
  ]
}).catch(err => console.error(err));
