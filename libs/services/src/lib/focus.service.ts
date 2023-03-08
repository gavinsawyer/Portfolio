import { Injectable }                                                        from "@angular/core";
import { User } from "@angular/fire/auth";
import { doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore } from "@angular/fire/firestore";
import { ShortcutsAPIPublicDocument }                             from "@portfolio/interfaces";
import { catchError, filter, map, mergeMap, Observable, Subject } from "rxjs";
import { AuthenticationService }                                  from "./authentication.service";


@Injectable({
  providedIn: "root",
})
export class FocusService {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly firestore: Firestore,
  ) {
    this
      .focusObservable = authenticationService
      .userObservable
      .pipe<DocumentSnapshot<ShortcutsAPIPublicDocument>, ShortcutsAPIPublicDocument | undefined, ShortcutsAPIPublicDocument, string, string>(
        mergeMap<User, Observable<DocumentSnapshot<ShortcutsAPIPublicDocument>>>((): Observable<DocumentSnapshot<ShortcutsAPIPublicDocument>> => docSnapshots<ShortcutsAPIPublicDocument>(doc(firestore, "environment/public") as DocumentReference<ShortcutsAPIPublicDocument>)),
        map<DocumentSnapshot<ShortcutsAPIPublicDocument>, ShortcutsAPIPublicDocument | undefined>((shortcutsAPIPublicDocumentSnapshot: DocumentSnapshot<ShortcutsAPIPublicDocument>): ShortcutsAPIPublicDocument | undefined => shortcutsAPIPublicDocumentSnapshot.data()),
        filter<ShortcutsAPIPublicDocument | undefined, ShortcutsAPIPublicDocument>((shortcutsAPIPublicDocument: ShortcutsAPIPublicDocument | undefined): shortcutsAPIPublicDocument is ShortcutsAPIPublicDocument => !!shortcutsAPIPublicDocument),
        map<ShortcutsAPIPublicDocument, string>((shortcutsAPIPublicDocument: ShortcutsAPIPublicDocument): string => shortcutsAPIPublicDocument.focus),
        catchError<string, Observable<string>>((): Observable<string> => new Subject<string>().asObservable())
      );
  }

  public readonly focusObservable: Observable<string>;

}
