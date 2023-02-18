import { Injectable, OnDestroy }                                                        from '@angular/core';
import { doc, DocumentReference, DocumentSnapshot, Firestore, onSnapshot, Unsubscribe } from "@angular/fire/firestore";
import { ShortcutsAPIPublicDocument }                                                   from "@portfolio/interfaces";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FocusService implements OnDestroy {

  constructor(
    Firestore: Firestore,
  ) {
    this
      .focusSubject = new BehaviorSubject("");
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot = onSnapshot<ShortcutsAPIPublicDocument>(doc(Firestore, "environment/public") as DocumentReference<ShortcutsAPIPublicDocument>, (documentSnapshot: DocumentSnapshot<ShortcutsAPIPublicDocument>): void => ((shortcutsAPIPublicDocument?: ShortcutsAPIPublicDocument): void => this.focusSubject.next(shortcutsAPIPublicDocument?.focus || ""))(documentSnapshot.data()));

    this
      .focusObservable = this
      .focusSubject
      .asObservable();
  }

  private readonly focusSubject: BehaviorSubject<string>;
  private readonly unsubscribeShortcutsAPIPublicDocumentOnSnapshot: Unsubscribe;

  public readonly focusObservable: Observable<string>;

  ngOnDestroy(): void {
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot();
  }
  
}
