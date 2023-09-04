import { isPlatformBrowser }                                                    from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal }                      from "@angular/core";
import { toSignal }                                                             from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, signInAnonymously, User, UserCredential }      from "@angular/fire/auth";
import { distinctUntilChanged, Observable, Observer, startWith, TeardownLogic } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  private readonly auth: Auth = inject<Auth>(Auth);

  public readonly user$: Signal<User | null> = isPlatformBrowser(inject<object>(PLATFORM_ID)) ? toSignal<User | null>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => onIdTokenChanged(
        this.auth,
        async (user: User | null): Promise<void> => user === null ? signInAnonymously(this.auth).then<void>(
          (userCredential: UserCredential): void => userObserver.next(userCredential.user),
        ) : userObserver.next(user),
      ),
    ).pipe<User | null, User | null>(
      startWith<User | null, [ User | null ]>(this.auth.currentUser),
      distinctUntilChanged<User | null>(),
    ),
    {
      requireSync: true,
    },
  ) : signal<User | null>(null);

}
