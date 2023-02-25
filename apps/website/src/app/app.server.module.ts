import { NgModule }                                                 from "@angular/core";
import { AppCheckToken as AngularFireAppCheckToken }                from "@angular/fire/app-check";
import { FlexLayoutServerModule }                                   from "@angular/flex-layout/server";
import { ServerModule }                                             from "@angular/platform-server";
import { APP_CHECK_TOKEN_PROMISE }                                  from "@portfolio/services";
import { getApps, initializeApp }                                   from "firebase-admin/app";
import { AppCheckToken as FirebaseAdminAppCheckToken, getAppCheck } from "firebase-admin/app-check";
import { environment }                                              from "../environments/environment";
import { AppComponent }     from "./app.component";
import { AppBrowserModule } from "./app.browser.module";


@NgModule({
  imports: [
    AppBrowserModule,
    FlexLayoutServerModule,
    ServerModule,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    {
      provide: APP_CHECK_TOKEN_PROMISE,
      useFactory: (): Promise<AngularFireAppCheckToken> => getAppCheck(getApps()[0] || initializeApp()).createToken(environment.firebase.appId).then((appCheckToken: FirebaseAdminAppCheckToken): AngularFireAppCheckToken => ({
        token: appCheckToken.token,
        expireTimeMillis: appCheckToken.ttlMillis,
      })),
    },
  ]
})
export class AppServerModule {}
