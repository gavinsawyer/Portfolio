import { IMAGE_LOADER, ImageLoaderConfig }                from "@angular/common";
import { APP_ID, Injector, NgModule }                     from "@angular/core";
import { ScreenTrackingService, UserTrackingService }     from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }  from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                     from "@angular/fire/auth";
import { Firestore, getFirestore, provideFirestore }      from "@angular/fire/firestore";
import { Functions, getFunctions, provideFunctions }      from "@angular/fire/functions";
import { ReactiveFormsModule }                            from "@angular/forms";
import { BrowserModule, provideClientHydration }          from "@angular/platform-browser";
import { RouterModule }                                   from "@angular/router";
import { TransferHttpCacheModule }                        from "@nguniversal/common";
import { AppCheckOptionsService }                         from "@portfolio/services";
import { environment }                                    from "../environments/environment";
import { AppComponent }                                   from "./app.component";
import { AsideComponent }                                 from "./components";


const baseTitle = "Console";

@NgModule({
  declarations: [AppComponent],
  imports:      [
    AsideComponent,
    BrowserModule,
    provideAppCheck(
      (injector: Injector): AppCheck => initializeAppCheck(
        undefined,
        injector.get(AppCheckOptionsService).appCheckOptions(
          environment.app,
          environment.recaptchaSiteKey,
        ),
      ),
    ),
    provideAuth(
      (): Auth => getAuth(),
    ),
    provideFirebaseApp(
      (): FirebaseApp => initializeApp(environment.firebase),
    ),
    provideFirestore(
      (): Firestore => getFirestore(),
    ),
    provideFunctions(
      (): Functions => getFunctions(),
    ),
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          loadComponent: () => import("./components/home").then(
            (m) => m.HomeComponent,
          ),
          path:          "",
          pathMatch:     "full",
          title:         baseTitle,
        },
        {
          loadComponent: () => import("./components/otherwise").then(
            (m) => m.OtherwiseComponent,
          ),
          path:          "**",
          title:         baseTitle + " | Page not found",
        },
      ],
      {
        initialNavigation:         "enabledBlocking",
        scrollPositionRestoration: "enabled",
      },
    ),
    TransferHttpCacheModule,
  ],
  providers:    [
    provideClientHydration(),
    ScreenTrackingService,
    UserTrackingService,
    {
      provide:  APP_ID,
      useValue: "console",
    },
    {
      provide:  IMAGE_LOADER,
      useValue: (imageLoaderConfig: ImageLoaderConfig): string => "/assets/" + (imageLoaderConfig.loaderParams?.["type"] === "Focus Icon" ? "icons/focus/" + imageLoaderConfig.src.replace(
        /\s+/g,
        "-",
      ) + ".svg" : imageLoaderConfig.loaderParams?.["type"] === "Icon" ? "icons/" + imageLoaderConfig.src.replace(
        /\s+/g,
        "-",
      ) + "." + imageLoaderConfig.loaderParams?.["foregroundAppearance"] + ".svg" : imageLoaderConfig.loaderParams?.["type"] === "Photo" ? "photos/" + [
        imageLoaderConfig.src.replace(
          /\s+/g,
          "-",
        ),
        (imageLoaderConfig.width || imageLoaderConfig.loaderParams?.["maxWidth"]) + "px",
        "webp",
      ].join(".") : ""),
    },
  ],
  bootstrap:    [
    AppComponent,
  ],
})
export class AppBrowserModule {
}
