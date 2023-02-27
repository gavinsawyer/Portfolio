import { isPlatformServer }                                                             from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID }                                   from '@angular/core';
import { doc, DocumentReference, DocumentSnapshot, Firestore, onSnapshot, Unsubscribe } from "@angular/fire/firestore";
import { ShortcutsAPIPublicDocument }                                                   from "@portfolio/interfaces";
import { BehaviorSubject, Observable }                                                  from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FocusService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,

    Firestore: Firestore,
  ) {
    this
      .focusSubject = new BehaviorSubject<string>("");
    this
      .focusObservable = this
      .focusSubject
      .asObservable();
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot = onSnapshot<ShortcutsAPIPublicDocument>(doc(Firestore, "environment/public") as DocumentReference<ShortcutsAPIPublicDocument>, (documentSnapshot: DocumentSnapshot<ShortcutsAPIPublicDocument>): void => ((shortcutsAPIPublicDocument?: ShortcutsAPIPublicDocument): void => this.focusSubject.next(shortcutsAPIPublicDocument?.focus || ""))(documentSnapshot.data()));

    isPlatformServer(platformId) && this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot();
  }

  private readonly focusSubject: BehaviorSubject<string>;
  private readonly unsubscribeShortcutsAPIPublicDocumentOnSnapshot: Unsubscribe;

  public readonly focusObservable: Observable<string>;

  ngOnDestroy(): void {
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot();
  }

}
