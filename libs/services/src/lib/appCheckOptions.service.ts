import { isPlatformServer }                                                    from "@angular/common";
import { Inject, Injectable, InjectionToken, Injector, PLATFORM_ID }           from "@angular/core";
import { CustomProvider, ReCaptchaV3Provider, AppCheckToken, AppCheckOptions } from "@angular/fire/app-check"
import type { app }                                                            from "firebase-admin";
import { environment }                                                         from "../../../../apps/website/src/environments/environment";


export const FIREBASE_ADMIN = new InjectionToken<app.App>("firebase-admin");

@Injectable({
  providedIn: 'root'
})
export class AppCheckOptionsService {

  constructor(
    @Inject(PLATFORM_ID)
    platform_id: string,
  ) {
    this
      .options = (injector: Injector): AppCheckOptions => ((firebaseAdmin) => isPlatformServer(platform_id) && firebaseAdmin ? {
        provider: new CustomProvider({
          getToken: () => firebaseAdmin.appCheck().createToken(environment.firebase.appId, {
            ttlMillis: 604800000,
          }).then((appCheckToken: any): AppCheckToken => ({
            ...appCheckToken,
            expireTimeMillis: appCheckToken.ttlMillis,
          })),
        }),
        isTokenAutoRefreshEnabled: false,
      } : {
        provider: new ReCaptchaV3Provider(environment.recaptcha),
        isTokenAutoRefreshEnabled: true,
      })(injector.get<app.App | null>(FIREBASE_ADMIN, null));
  }

  public readonly options: (injector: Injector) => AppCheckOptions

}
