import { Injector, NgModule }                                                                    from "@angular/core";
import { Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp }                                        from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }                                         from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                                                            from "@angular/fire/auth";
import { Firestore, getFirestore, provideFirestore }                                             from "@angular/fire/firestore";
import { Functions, getFunctions, provideFunctions }                                             from "@angular/fire/functions";
import { FlexLayoutModule }                                                                      from "@angular/flex-layout";
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
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
    provideFirebaseApp((): FirebaseApp => initializeApp(environment.firebase)),
    provideAnalytics((): Analytics => getAnalytics()),
    provideAuth((): Auth => getAuth()),
    provideAppCheck((injector: Injector): AppCheck => initializeAppCheck(undefined, injector.get(AppCheckOptionsService).appCheckOptions(injector))),
    provideFirestore((): Firestore => getFirestore()),
    provideFunctions((): Functions => getFunctions()),
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
          path: "",
          pathMatch: "full",
          title: baseTitle,
        },
        {
          loadChildren: () => import("./privacy/privacy.module").then((m) => m.PrivacyModule),
          path: "privacy",
          title: baseTitle + " | Privacy",
        },
        {
          loadChildren: () => import("./otherwise/otherwise.module").then((m) => m.OtherwiseModule),
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
