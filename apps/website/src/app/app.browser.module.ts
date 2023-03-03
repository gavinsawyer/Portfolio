import { Injector, NgModule }                                                                    from "@angular/core";
import { Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp }                                        from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }                                         from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                                                            from "@angular/fire/auth";
import { Firestore, getFirestore, provideFirestore }                                             from "@angular/fire/firestore";
import { ReactiveFormsModule }                                                                   from "@angular/forms";
import { BrowserModule }                                                                         from "@angular/platform-browser";
import { RouterModule }                                                                          from "@angular/router";
import { TransferHttpCacheModule }                                                               from "@nguniversal/common"
import { ComponentsModule }                                                                      from "@portfolio/components";
import { AppCheckOptionsService }                                                                from "@portfolio/services";
import { NgxMaskModule }                                                                         from "ngx-mask";
import { environment }                                                                           from "../environments/environment";
import { AppComponent }                                                                          from "./app.component";


const baseTitle: string = "Gavin Sawyer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: "serverApp",
    }),
    ComponentsModule,
    NgxMaskModule.forRoot(),
    provideFirebaseApp((): FirebaseApp => initializeApp(environment.firebase)),
    provideAnalytics((): Analytics => getAnalytics()),
    provideAuth((): Auth => getAuth()),
    provideAppCheck((injector: Injector): AppCheck => initializeAppCheck(undefined, injector.get(AppCheckOptionsService).appCheckOptions())),
    provideFirestore((): Firestore => getFirestore()),
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          loadComponent: () => import("./home/home.component").then((m) => m.HomeComponent),
          path: "",
          pathMatch: "full",
          title: baseTitle,
        },
        {
          loadComponent: () => import("./privacy/privacy.component").then((m) => m.PrivacyComponent),
          path: "privacy",
          title: baseTitle + " | Privacy",
        },
        {
          loadComponent: () => import("./otherwise/otherwise.component").then((m) => m.OtherwiseComponent),
          path: "**",
          title: baseTitle + " | Page not found",
        },
      ],
      {
        initialNavigation: "enabledBlocking",
        scrollPositionRestoration: "enabled",
      },
    ),
    TransferHttpCacheModule,
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
  ],
  bootstrap: [AppComponent],
})
export class AppBrowserModule {}
