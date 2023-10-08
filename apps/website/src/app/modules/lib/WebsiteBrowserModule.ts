import { Injector, NgModule }                                          from "@angular/core";
import { Analytics, getAnalytics, provideAnalytics }                   from "@angular/fire/analytics";
import { FirebaseApp, initializeApp, provideFirebaseApp }              from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }               from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                                  from "@angular/fire/auth";
import { Firestore, getFirestore, provideFirestore }                   from "@angular/fire/firestore";
import { ReactiveFormsModule }                                         from "@angular/forms";
import { BrowserModule }                                               from "@angular/platform-browser";
import { RouterModule }                                                from "@angular/router";
import { TransferHttpCacheModule }                                     from "@nguniversal/common";
import { getAppModuleProviders }                                       from "@portfolio/app-module-providers";
import { BannerComponent, HeaderComponent, routes as portfolioRoutes } from "@portfolio/components";
import { AppCheckOptionsService }                                      from "@portfolio/services";
import { gitInfo }                                                     from "../../../.git-info";
import { packageVersion }                                              from "../../../.package-version";
import { environment }                                                 from "../../../environment";
import { AsideComponent, RootComponent, routes as websiteRoutes }      from "../../components";


@NgModule({
  bootstrap:    [
    RootComponent,
  ],
  declarations: [
    RootComponent,
  ],
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
        injector.get(AppCheckOptionsService).appCheckOptions,
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
        ...websiteRoutes,
        ...portfolioRoutes,
      ],
      {
        bindToComponentInputs:     true,
        initialNavigation:         "enabledBlocking",
        scrollPositionRestoration: "enabled",
      },
    ),
    TransferHttpCacheModule,
    HeaderComponent,
  ],
  providers:    getAppModuleProviders(
    {
      environment:    environment,
      gitInfo:        gitInfo,
      packageVersion: packageVersion,
    },
  ),
})
export class WebsiteBrowserModule {
}
