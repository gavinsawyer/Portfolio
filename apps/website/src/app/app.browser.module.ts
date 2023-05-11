import { IMAGE_LOADER, ImageLoaderConfig } from "@angular/common";
import { Injector, NgModule }              from "@angular/core";
import { Analytics, getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp }                                        from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }                                         from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                                                            from "@angular/fire/auth";
import { Firestore, getFirestore, provideFirestore }                                             from "@angular/fire/firestore";
import { ReactiveFormsModule }                                                                   from "@angular/forms";
import { BrowserModule, provideClientHydration }                                                 from "@angular/platform-browser";
import { RouterModule }                                                                          from "@angular/router";
import { TransferHttpCacheModule }                                                               from "@nguniversal/common";
import { BannerComponent }                                                                       from "@portfolio/components";
import { AppCheckOptionsService }                                                                from "@portfolio/services";
import { environment }                                                                           from "../environments/environment";
import { AppComponent }                                                                          from "./app.component";
import { AsideComponent }                                                                        from "./components";


const baseTitle = "Gavin Sawyer";

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    AsideComponent,
    BannerComponent,
    BrowserModule.withServerTransition({
      appId: "serverApp",
    }),
    provideAnalytics((): Analytics => getAnalytics()),
    provideAppCheck((injector: Injector): AppCheck => initializeAppCheck(undefined, injector.get(AppCheckOptionsService).appCheckOptions(environment.app, environment.recaptchaSiteKey))),
    provideAuth((): Auth => getAuth()),
    provideFirebaseApp((): FirebaseApp => initializeApp(environment.firebase)),
    provideFirestore((): Firestore => getFirestore()),
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          loadComponent: () => import("./components/home").then((m) => m.HomeComponent),
          path: "",
          pathMatch: "full",
          title: baseTitle,
        },
        {
          loadComponent: () => import("./components/privacy").then((m) => m.PrivacyComponent),
          path: "privacy",
          title: baseTitle + " | Privacy",
        },
        {
          loadComponent: () => import("./components/otherwise").then((m) => m.OtherwiseComponent),
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
    provideClientHydration(),
    ScreenTrackingService,
    UserTrackingService,
    {
      provide: IMAGE_LOADER,
      useValue: (imageLoaderConfig: ImageLoaderConfig): string => "/assets/" + (imageLoaderConfig.loaderParams?.["type"] === "Focus Icon" ? "icons/focus/" + imageLoaderConfig.src + ".svg" : imageLoaderConfig.loaderParams?.["type"] === "Icon" ? "icons/" + imageLoaderConfig.src + "." + imageLoaderConfig.loaderParams?.["foregroundAppearance"] + ".svg" : imageLoaderConfig.loaderParams?.["type"] === "Photo" ? "photos/" + [imageLoaderConfig.src.split(".")[0], (imageLoaderConfig.width || imageLoaderConfig.loaderParams?.["maxWidth"]) + "px", imageLoaderConfig.src.split(".")[1]].join(".") : ""),
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppBrowserModule {
}
