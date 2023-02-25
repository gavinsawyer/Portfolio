import { isPlatformBrowser, isPlatformServer }                    from "@angular/common";
import { Inject, Injectable, PLATFORM_ID }                        from "@angular/core";
import { Auth, signInAnonymously, UserCredential }                from "@angular/fire/auth";
import { BehaviorSubject, filter, Observable, shareReplay, take } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(PLATFORM_ID)
    platform_id: string,

    Auth: Auth,
  ) {
    this
      .userCredentialSubject = new BehaviorSubject<UserCredential | undefined>(undefined);
    this
      .userCredentialObservable = this
      .userCredentialSubject
      .asObservable()
      .pipe<UserCredential | undefined, UserCredential | undefined>(
        shareReplay<UserCredential | undefined>(),
        isPlatformServer(platform_id) ? take<UserCredential | undefined>(1) : filter<UserCredential | undefined>((): boolean => true)
      );

    isPlatformBrowser(platform_id) && signInAnonymously(Auth)
      .then((userCredential: UserCredential): void => this.userCredentialSubject.next(userCredential))
      .catch((reason: any): void => console.error(reason));
  }

  public readonly userCredentialObservable: Observable<UserCredential | undefined>;
  public readonly userCredentialSubject: BehaviorSubject<UserCredential | undefined>;

}
