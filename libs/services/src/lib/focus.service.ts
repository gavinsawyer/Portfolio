import { isPlatformBrowser }                                                 from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, signal, Signal }                   from "@angular/core";
import { toSignal }                                                          from "@angular/core/rxjs-interop";
import { doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore } from "@angular/fire/firestore";
import { PublicEnvironmentDocument }                                         from "@gavinsawyer/shortcuts-api";
import { catchError, filter, map, Observable }                               from "rxjs";


@Injectable({
  providedIn: "root",
})
export class FocusService {

  public readonly focus: Signal<PublicEnvironmentDocument["focus"]>;

  constructor(
    @Inject(PLATFORM_ID) platformId: object,

    firestore: Firestore,
  ) {
    this
      .focus = isPlatformBrowser(platformId) ? toSignal<PublicEnvironmentDocument["focus"]>(
        docSnapshots<PublicEnvironmentDocument>(
          doc(
            firestore,
            "shortcutsEnvironment/public",
          ) as DocumentReference<PublicEnvironmentDocument>,
        ).pipe<PublicEnvironmentDocument | undefined, PublicEnvironmentDocument, PublicEnvironmentDocument["focus"], PublicEnvironmentDocument["focus"]>(
          map<DocumentSnapshot<PublicEnvironmentDocument>, PublicEnvironmentDocument | undefined>(
            (shortcutsAPIPublicDocumentSnapshot: DocumentSnapshot<PublicEnvironmentDocument>): PublicEnvironmentDocument | undefined => shortcutsAPIPublicDocumentSnapshot.data(),
          ),
          filter<PublicEnvironmentDocument | undefined, PublicEnvironmentDocument>(
            (shortcutsAPIPublicDocument: PublicEnvironmentDocument | undefined): shortcutsAPIPublicDocument is PublicEnvironmentDocument => !!shortcutsAPIPublicDocument,
          ),
          map<PublicEnvironmentDocument, PublicEnvironmentDocument["focus"]>(
            (publicEnvironmentDocument: PublicEnvironmentDocument): PublicEnvironmentDocument["focus"] => publicEnvironmentDocument.focus,
          ),
          catchError<PublicEnvironmentDocument["focus"], Observable<PublicEnvironmentDocument["focus"]>>(
            (): Observable<PublicEnvironmentDocument["focus"]> => new Observable<PublicEnvironmentDocument["focus"]>(),
          ),
        ),
      ) : signal<PublicEnvironmentDocument["focus"]>(undefined);
  }

}
