import { isPlatformBrowser }                       from "@angular/common";
import { Inject, Injectable, PLATFORM_ID }         from "@angular/core";
import { Auth, signInAnonymously, UserCredential } from "@angular/fire/auth";
import { BehaviorSubject, Observable }             from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,

    Auth: Auth,
  ) {
    this
      .userCredentialSubject = new BehaviorSubject<UserCredential | undefined>(undefined);
    this
      .userCredentialObservable = this
      .userCredentialSubject
      .asObservable();

    isPlatformBrowser(platformId) && signInAnonymously(Auth)
      .then((userCredential: UserCredential): void => this.userCredentialSubject.next(userCredential))
      .catch((reason: any): void => console.error(reason));
  }

  public readonly userCredentialObservable: Observable<UserCredential | undefined>;
  public readonly userCredentialSubject: BehaviorSubject<UserCredential | undefined>;

}
