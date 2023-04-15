import { Injectable }                                                        from "@angular/core";
import { User }                                                              from "@angular/fire/auth";
import { doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore } from "@angular/fire/firestore";
import { PublicEnvironmentDocument }                                         from "@gavinsawyer/shortcuts-api";
import { catchError, filter, map, mergeMap, Observable, Subject }            from "rxjs";
import { AuthenticationService }                                             from "./authentication.service";


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
      .pipe<DocumentSnapshot<PublicEnvironmentDocument>, PublicEnvironmentDocument | undefined, PublicEnvironmentDocument, string | undefined, string, string>(
        mergeMap<User, Observable<DocumentSnapshot<PublicEnvironmentDocument>>>((): Observable<DocumentSnapshot<PublicEnvironmentDocument>> => docSnapshots<PublicEnvironmentDocument>(doc(firestore, "shortcutsEnvironment/public") as DocumentReference<PublicEnvironmentDocument>)),
        map<DocumentSnapshot<PublicEnvironmentDocument>, PublicEnvironmentDocument | undefined>((shortcutsAPIPublicDocumentSnapshot: DocumentSnapshot<PublicEnvironmentDocument>): PublicEnvironmentDocument | undefined => shortcutsAPIPublicDocumentSnapshot.data()),
        filter<PublicEnvironmentDocument | undefined, PublicEnvironmentDocument>((shortcutsAPIPublicDocument: PublicEnvironmentDocument | undefined): shortcutsAPIPublicDocument is PublicEnvironmentDocument => !!shortcutsAPIPublicDocument),
        map<PublicEnvironmentDocument, string | undefined>((shortcutsAPIPublicDocument: PublicEnvironmentDocument): string | undefined => shortcutsAPIPublicDocument.focus),
        filter<string | undefined, string>((focus: string | undefined): focus is string => !!focus),
        catchError<string, Observable<string>>((): Observable<string> => new Subject<string>().asObservable())
      );
  }

  public readonly focusObservable: Observable<string>;

}
