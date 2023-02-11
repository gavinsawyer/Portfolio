import { NgModule }                                                           from "@angular/core";
import { FirebaseApp, initializeApp, provideFirebaseApp }                     from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from "@angular/fire/app-check";
import { getFirestore, provideFirestore }                                     from "@angular/fire/firestore";
import { getFunctions, provideFunctions }                                     from "@angular/fire/functions";
import { FlexLayoutModule }                                                   from "@angular/flex-layout";
import { ReactiveFormsModule }                                                from "@angular/forms";
import { BrowserModule }                                                      from "@angular/platform-browser";
import { RouterModule }                                                       from "@angular/router";
import { environment }                                                        from "../environments/environment";
import { AppComponent }                                                       from "./app.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: "serverApp",
    }),
    FlexLayoutModule,
    provideFirebaseApp((): FirebaseApp => initializeApp(environment.firebase)),
    provideAppCheck((): AppCheck => initializeAppCheck(undefined, {
      provider: new ReCaptchaV3Provider(environment.recaptcha),
      isTokenAutoRefreshEnabled: true,
    })),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path: "",
          loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
        },
      ],
      {
        initialNavigation: "enabledBlocking",
      },
    ),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
