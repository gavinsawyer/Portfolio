import { isPlatformBrowser }                                                 from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, Signal }                           from "@angular/core";
import { takeUntilDestroyed, toSignal }                                      from "@angular/core/rxjs-interop";
import { doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore } from "@angular/fire/firestore";
import { PublicEnvironmentDocument }                                         from "@gavinsawyer/shortcuts-api";
import { catchError, filter, map, Observable, shareReplay, Subject }         from "rxjs";
import { AuthenticationService }                                             from "./authentication.service";


@Injectable({
  providedIn: "root",
})
export class FocusService {

  public readonly focus: Signal<PublicEnvironmentDocument["focus"]>;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: object,

    private readonly authenticationService: AuthenticationService,
    private readonly firestore: Firestore,
  ) {
    this
      .focus = isPlatformBrowser(platformId) ? toSignal<PublicEnvironmentDocument["focus"]>(docSnapshots<PublicEnvironmentDocument>(doc(firestore, "shortcutsEnvironment/public") as DocumentReference<PublicEnvironmentDocument>).pipe<PublicEnvironmentDocument | undefined, PublicEnvironmentDocument, PublicEnvironmentDocument["focus"], PublicEnvironmentDocument["focus"], PublicEnvironmentDocument["focus"], PublicEnvironmentDocument["focus"]>(
        map<DocumentSnapshot<PublicEnvironmentDocument>, PublicEnvironmentDocument | undefined>((shortcutsAPIPublicDocumentSnapshot: DocumentSnapshot<PublicEnvironmentDocument>): PublicEnvironmentDocument | undefined => shortcutsAPIPublicDocumentSnapshot.data()),
        filter<PublicEnvironmentDocument | undefined, PublicEnvironmentDocument>((shortcutsAPIPublicDocument: PublicEnvironmentDocument | undefined): shortcutsAPIPublicDocument is PublicEnvironmentDocument => !!shortcutsAPIPublicDocument),
        map<PublicEnvironmentDocument, PublicEnvironmentDocument["focus"]>((publicEnvironmentDocument: PublicEnvironmentDocument): PublicEnvironmentDocument["focus"] => publicEnvironmentDocument.focus),
        catchError<PublicEnvironmentDocument["focus"], Observable<PublicEnvironmentDocument["focus"]>>((): Observable<PublicEnvironmentDocument["focus"]> => new Subject<PublicEnvironmentDocument["focus"]>().asObservable()),
        shareReplay<PublicEnvironmentDocument["focus"]>(),
        takeUntilDestroyed<PublicEnvironmentDocument["focus"]>(),
      )) : toSignal<PublicEnvironmentDocument["focus"]>(new Subject<PublicEnvironmentDocument["focus"]>().asObservable());
  }

}
