import { Injector, NgModule }                                     from "@angular/core";
import { FirebaseApp, initializeApp, provideFirebaseApp }         from "@angular/fire/app";
import { AppCheck, initializeAppCheck, provideAppCheck }          from "@angular/fire/app-check";
import { Auth, getAuth, provideAuth }                             from "@angular/fire/auth";
import { Firestore, getFirestore, provideFirestore }              from "@angular/fire/firestore";
import { Functions, getFunctions, provideFunctions }              from "@angular/fire/functions";
import { ReactiveFormsModule }                                    from "@angular/forms";
import { BrowserModule }                                          from "@angular/platform-browser";
import { RouterModule }                                           from "@angular/router";
import { TransferHttpCacheModule }                                from "@nguniversal/common";
import { getAppModuleProviders }                                  from "@portfolio/app-module-providers";
import { routes as portfolioRoutes }                              from "@portfolio/components";
import { AppCheckOptionsService }                                 from "@portfolio/services";
import { gitInfo }                                                from "../../../.git-info";
import { packageVersion }                                         from "../../../.package-version";
import { environment }                                            from "../../../environment";
import { AsideComponent, RootComponent, routes as consoleRoutes } from "../../components";


@NgModule({
  bootstrap:    [
    RootComponent,
  ],
  declarations: [
    RootComponent,
  ],
  imports:      [
    AsideComponent,
    BrowserModule,
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
    provideFunctions(
      (): Functions => getFunctions(),
    ),
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        ...consoleRoutes,
        ...portfolioRoutes,
      ],
      {
        bindToComponentInputs:     true,
        initialNavigation:         "enabledBlocking",
        scrollPositionRestoration: "enabled",
      },
    ),
    TransferHttpCacheModule,
  ],
  providers:    getAppModuleProviders(
    {
      environment:    environment,
      gitInfo:        gitInfo,
      packageVersion: packageVersion,
    },
  ),
})
export class AppBrowserModule {
}
