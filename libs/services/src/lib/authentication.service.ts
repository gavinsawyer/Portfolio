import { Injectable }                              from "@angular/core";
import { Auth, signInAnonymously, UserCredential } from "@angular/fire/auth";
import { BehaviorSubject, Observable }             from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    Auth: Auth,
  ) {
    this
      .userCredentialSubject = new BehaviorSubject<UserCredential | undefined>(undefined);
    this
      .userCredentialObservable = this
      .userCredentialSubject
      .asObservable();

    signInAnonymously(Auth)
      .then((userCredential: UserCredential): void => this.userCredentialSubject.next(userCredential))
      .catch((reason: any): void => console.error(reason));
  }

  public readonly userCredentialSubject: BehaviorSubject<UserCredential | undefined>;
  public readonly userCredentialObservable: Observable<UserCredential | undefined>;

}
