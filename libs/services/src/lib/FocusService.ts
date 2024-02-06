import { isPlatformBrowser }                                                               from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal }                                 from "@angular/core";
import { toSignal }                                                                        from "@angular/core/rxjs-interop";
import { FirebaseApp }                                                                     from "@angular/fire/app";
import { doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore, getFirestore } from "@angular/fire/firestore";
import { Focus, PublicDocument }                                                           from "@gavinsawyer/shortcuts-api";
import { catchError, filter, map, Observable }                                             from "rxjs";


@Injectable({
  providedIn: "root",
})
export class FocusService {

  private readonly firestore: Firestore = getFirestore(
    inject<FirebaseApp>(FirebaseApp),
    "shortcuts-api",
  );

  public readonly focus$: Signal<Focus | undefined> = isPlatformBrowser(inject<object>(PLATFORM_ID)) ? toSignal<Focus | undefined>(
    docSnapshots<PublicDocument>(
      doc(
        this.firestore,
        "environment/public",
      ) as DocumentReference<PublicDocument>,
    ).pipe<PublicDocument | undefined, PublicDocument, Focus | undefined, Focus | undefined>(
      map<DocumentSnapshot<PublicDocument>, PublicDocument | undefined>(
        (publicDocumentDocumentSnapshot: DocumentSnapshot<PublicDocument>): PublicDocument | undefined => publicDocumentDocumentSnapshot.data(),
      ),
      filter<PublicDocument | undefined, PublicDocument>(
        (publicDocument: PublicDocument | undefined): publicDocument is PublicDocument => !!publicDocument,
      ),
      map<PublicDocument, Focus | undefined>(
        (publicDocument: PublicDocument): Focus | undefined => publicDocument.users["gavin"].focus,
      ),
      catchError<Focus | undefined, Observable<Focus | undefined>>(
        (): Observable<Focus | undefined> => new Observable<Focus | undefined>(),
      ),
    ),
  ) : signal<Focus | undefined>(undefined);

}
