import { isPlatformServer }                                                    from "@angular/common";
import { Inject, Injectable, PLATFORM_ID }                                     from "@angular/core";
import { CustomProvider, ReCaptchaV3Provider, AppCheckToken, AppCheckOptions } from "@angular/fire/app-check"
import { environment }                                                         from "../../../../apps/website/src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AppCheckOptionsService {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,
  ) {
    this
      .appCheckOptions = (): AppCheckOptions => isPlatformServer(platformId) ? {
        isTokenAutoRefreshEnabled: false,
        provider: new CustomProvider({
          getToken: (): Promise<AppCheckToken> => Promise.resolve({
            token: process.env["AppCheckUniversalToken"] as string,
            expireTimeMillis: Date.now() + 604800000,
          }),
        }),
      } : {
        isTokenAutoRefreshEnabled: true,
        provider: new ReCaptchaV3Provider(environment.recaptcha),
      };
  }

  public readonly appCheckOptions: () => AppCheckOptions

}
