import { isPlatformBrowser }                                                  from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID, signal, WritableSignal } from "@angular/core";
import { Auth, onIdTokenChanged, signInAnonymously, Unsubscribe, User }       from "@angular/fire/auth";


@Injectable({
  providedIn: "root",
})
export class AuthenticationService implements OnDestroy {

  public readonly user: WritableSignal<User | null>;

  private readonly unsubscribeIdTokenChanged: Unsubscribe;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: object,

    private readonly auth: Auth,
  ) {
    this
      .unsubscribeIdTokenChanged = onIdTokenChanged(auth, (async (user: User | null): Promise<void> => user ? this.user.update((): User | null => user) : isPlatformBrowser(platformId) ? signInAnonymously(auth).then<void>((): void => void (0)).catch<void>((reason: any): void => console.error(reason)) : void (0)));
    this
      .user = signal<User | null>(auth.currentUser);

    isPlatformBrowser(platformId) || this
      .unsubscribeIdTokenChanged();
  }

  ngOnDestroy(): void {
    this
      .unsubscribeIdTokenChanged();
  }

}
