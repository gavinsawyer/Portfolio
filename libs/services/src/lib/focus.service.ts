import { isPlatformBrowser }                                                                       from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID }                                              from '@angular/core';
import { User }                                                                                    from "@angular/fire/auth";
import { doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore }                       from "@angular/fire/firestore";
import { ShortcutsAPIPublicDocument }                                                              from "@portfolio/interfaces";
import { catchError, filter, map, mergeMap, Observable, shareReplay, Subject, Subscription, take } from "rxjs";
import { AuthenticationService }                                                                   from "./authentication.service";


@Injectable({
  providedIn: 'root'
})
export class FocusService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,

    AuthenticationService: AuthenticationService,
    Firestore: Firestore,
  ) {
    this
      .focusSubject = new Subject<string>();
    this
      .focusObservable = this
      .focusSubject
      .asObservable()
      .pipe<string, string>(
        shareReplay<string>(),
        isPlatformBrowser(platformId) ? filter<string>((): true => true) : take<string>(1)
      );
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot = AuthenticationService
      .userObservable
      .pipe<DocumentSnapshot<ShortcutsAPIPublicDocument>, ShortcutsAPIPublicDocument | undefined, ShortcutsAPIPublicDocument | undefined>(
        mergeMap<User, Observable<DocumentSnapshot<ShortcutsAPIPublicDocument>>>((): Observable<DocumentSnapshot<ShortcutsAPIPublicDocument>> => docSnapshots<ShortcutsAPIPublicDocument>(doc(Firestore, "environment/public") as DocumentReference<ShortcutsAPIPublicDocument>)),
        map<DocumentSnapshot<ShortcutsAPIPublicDocument>, ShortcutsAPIPublicDocument | undefined>((shortcutsAPIPublicDocumentSnapshot: DocumentSnapshot<ShortcutsAPIPublicDocument>): ShortcutsAPIPublicDocument | undefined => shortcutsAPIPublicDocumentSnapshot.data()),
        catchError<ShortcutsAPIPublicDocument | undefined, Observable<ShortcutsAPIPublicDocument>>(() => (new Subject<ShortcutsAPIPublicDocument>()).asObservable())
      )
      .subscribe((shortcutsAPIPublicDocument: ShortcutsAPIPublicDocument | undefined): void => {
        shortcutsAPIPublicDocument && this
          .focusSubject
          .next(shortcutsAPIPublicDocument.focus)
      })
      .unsubscribe;

    isPlatformBrowser(platformId) || this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot();
  }

  private readonly focusSubject: Subject<string>;
  private readonly unsubscribeShortcutsAPIPublicDocumentOnSnapshot: Subscription["unsubscribe"];

  public readonly focusObservable: Observable<string>;

  ngOnDestroy(): void {
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot();
  }

}
