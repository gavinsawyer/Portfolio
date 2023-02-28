import { isPlatformBrowser }                                              from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID }                     from "@angular/core";
import { Auth, onAuthStateChanged, signInAnonymously, Unsubscribe, User } from "@angular/fire/auth";
import { Observable, shareReplay, Subject }                               from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,

    Auth: Auth,
  ) {
    this
      .unsubscribeAuthStateChanged = onAuthStateChanged(Auth, ((user: User | null): void => {
        user && this
          .userSubject
          .next(user);
      }));
    this
      .userSubject = new Subject<User>();
    this
      .userObservable = this
      .userSubject
      .asObservable()
      .pipe<User>(
        shareReplay<User>()
      );

    isPlatformBrowser(platformId) ? signInAnonymously(Auth) : this
      .unsubscribeAuthStateChanged();
  }

  private readonly unsubscribeAuthStateChanged: Unsubscribe;
  private readonly userSubject: Subject<User>;

  public readonly userObservable: Observable<User>;

  ngOnDestroy(): void {
    this
      .unsubscribeAuthStateChanged();
  }

}
