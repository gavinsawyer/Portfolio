import { isPlatformServer }                                                    from "@angular/common";
import { Inject, Injectable, InjectionToken, Injector, PLATFORM_ID }           from "@angular/core";
import { CustomProvider, ReCaptchaV3Provider, AppCheckToken, AppCheckOptions } from "@angular/fire/app-check"
import { environment }                                                         from "../../../../apps/website/src/environments/environment";


export const APP_CHECK_TOKEN_PROMISE = new InjectionToken<Promise<AppCheckToken>>("app_check_token_promise");

@Injectable({
  providedIn: 'root'
})
export class AppCheckOptionsService {

  constructor(
    @Inject(PLATFORM_ID)
    platform_id: string,
  ) {
    this
      .appCheckOptions = (injector: Injector): AppCheckOptions => ((appCheckTokenPromise: Promise<AppCheckToken> | null): AppCheckOptions => isPlatformServer(platform_id) && appCheckTokenPromise ? {
        isTokenAutoRefreshEnabled: false,
        provider: new CustomProvider({
          getToken: (): Promise<AppCheckToken> => appCheckTokenPromise,
        }),
      } : {
        isTokenAutoRefreshEnabled: true,
        provider: new ReCaptchaV3Provider(environment.recaptcha),
      })(injector.get<Promise<AppCheckToken> | null>(APP_CHECK_TOKEN_PROMISE, null));
  }

  public readonly appCheckOptions: (injector: Injector) => AppCheckOptions

}
