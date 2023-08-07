import { IMAGE_LOADER, ImageLoaderConfig }                                                       from "@angular/common";
import { APP_ID, Injector, NgModule }                                                            from "@angular/core";
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
import { APP_ENVIRONMENT, GIT_INFO, PACKAGE_VERSION }                                            from "@portfolio/injection-tokens";
import { AppCheckOptionsService }                                                                from "@portfolio/services";
import { gitInfo }                                                                               from "../../../.git-info";
import { packageVersion }                                                                        from "../../../.package-version";
import { environment }                                                                           from "../../../environment";
import { AsideComponent, RootComponent }                                                         from "../../components";


const baseTitle = "Gavin Sawyer";

@NgModule({
  declarations: [RootComponent],
  imports:      [
    AsideComponent,
    BannerComponent,
    BrowserModule,
    provideAnalytics(
      (): Analytics => getAnalytics(),
    ),
    provideAppCheck(
      (injector: Injector): AppCheck => initializeAppCheck(
        undefined,
        injector.get(AppCheckOptionsService).appCheckOptions(),
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
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          loadComponent: () => import("../../components").then(
            (m) => m.HomeRouteComponent,
          ),
          path:          "",
          pathMatch:     "full",
          title:         baseTitle,
        },
        {
          loadComponent: () => import("../../components").then(
            (m) => m.PrivacyRouteComponent,
          ),
          path:          "privacy",
          title:         baseTitle + " | Privacy",
        },
        {
          loadComponent: () => import("@portfolio/components").then(
            (m) => m.OtherwiseRouteComponent,
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
      useValue: "website",
    },
    {
      provide:  APP_ENVIRONMENT,
      useValue: environment,
    },
    {
      provide:  GIT_INFO,
      useValue: gitInfo,
    },
    {
      provide:  PACKAGE_VERSION,
      useValue: packageVersion,
    },
    {
      provide:  IMAGE_LOADER,
      useValue: (imageLoaderConfig: ImageLoaderConfig): string => "/assets/" + (imageLoaderConfig.loaderParams?.["type"] === "Focus Icon" ? "icons/focus/" + imageLoaderConfig.src.replace(
        /\s+/g,
        "-",
      ) + ".svg" : imageLoaderConfig.loaderParams?.["type"] === "Icon" ? "icons/" + imageLoaderConfig.src.replace(
        /\s+/g,
        "-",
      ) + ".svg" : imageLoaderConfig.loaderParams?.["type"] === "Photo" ? "photos/" + [
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
    RootComponent,
  ],
})
export class AppBrowserModule {
}
