import { NgModule } from '@angular/core';
import {
  Analytics,
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import {
  FirebaseApp,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import {
  AppCheck,
  initializeAppCheck,
  provideAppCheck,
  ReCaptchaV3Provider,
} from '@angular/fire/app-check';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import {
  Firestore,
  getFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import {
  Functions,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@portfolio/components';
import { NgxMaskModule } from 'ngx-mask';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'serverApp',
    }),
    ComponentsModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
    provideFirebaseApp((): FirebaseApp => initializeApp(environment.firebase)),
    provideAnalytics((): Analytics => getAnalytics()),
    provideAuth((): Auth => getAuth()),
    provideAppCheck(
      (): AppCheck =>
        initializeAppCheck(undefined, {
          provider: new ReCaptchaV3Provider(environment.recaptcha),
          isTokenAutoRefreshEnabled: true,
        })
    ),
    provideFirestore((): Firestore => getFirestore()),
    provideFunctions((): Functions => getFunctions()),
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          loadChildren: () =>
            import('./home/home.module').then((m) => m.HomeModule),
        },
        {
          path: 'privacy',
          loadChildren: () =>
            import('./privacy/privacy.module').then((m) => m.PrivacyModule),
        },
      ],
      {
        initialNavigation: 'enabledBlocking',
        scrollPositionRestoration: 'enabled',
      }
    ),
  ],
  providers: [ScreenTrackingService, UserTrackingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
