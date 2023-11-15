import { isPlatformBrowser }                                                                                                                                                    from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal }                                                                                                                      from "@angular/core";
import { toSignal }                                                                                                                                                             from "@angular/core/rxjs-interop";
import { Auth, onIdTokenChanged, User }                                                                                                                                         from "@angular/fire/auth";
import { collection, CollectionReference, collectionSnapshots, doc, docSnapshots, DocumentData, DocumentReference, DocumentSnapshot, Firestore, QueryDocumentSnapshot, setDoc } from "@angular/fire/firestore";
import { MessageDocument }                                                                                                                                                      from "@portfolio/interfaces";
import { catchError, filter, map, Observable, Observer, ReplaySubject, startWith, switchMap, TeardownLogic }                                                                    from "rxjs";
import { AuthenticationService }                                                                                                                                                from "../";


@Injectable({
  providedIn: "root",
})
export class MessagesService {

  private readonly auth: Auth = inject<Auth>(Auth);
  private readonly authenticationService: AuthenticationService = inject<AuthenticationService>(AuthenticationService);
  private readonly createdMessageDocumentReferenceSubject: ReplaySubject<DocumentReference<MessageDocument>> = new ReplaySubject<DocumentReference<MessageDocument>>(1);
  private readonly firestore: Firestore = inject<Firestore>(Firestore);

  public readonly messageDocuments$: Signal<MessageDocument[]> = isPlatformBrowser(inject<object>(PLATFORM_ID)) ? toSignal<MessageDocument[]>(
    new Observable<User | null>(
      (userObserver: Observer<User | null>): TeardownLogic => onIdTokenChanged(
        this.auth,
        (user: User | null) => userObserver.next(user),
      ),
    ).pipe<User | null, User, MessageDocument[], MessageDocument[]>(
      startWith<User | null>(this.auth.currentUser),
      filter<User | null, User>(
        (user: User | null): user is User => !!user,
      ),
      switchMap<User, Observable<MessageDocument[]>>(
        (user: User): Observable<MessageDocument[]> => collectionSnapshots<MessageDocument>(
          collection(
            this.firestore,
            "messages",
          ) as CollectionReference<MessageDocument>,
        ).pipe<MessageDocument[], MessageDocument[]>(
          map<QueryDocumentSnapshot<MessageDocument>[], MessageDocument[]>(
            (messageDocumentSnapshots: QueryDocumentSnapshot<MessageDocument>[]): MessageDocument[] => messageDocumentSnapshots.map<MessageDocument>(
              (messageDocumentSnapshot: QueryDocumentSnapshot<MessageDocument>): MessageDocument => messageDocumentSnapshot.data(),
            ),
          ),
          catchError<MessageDocument[], Observable<MessageDocument[]>>(
            (): Observable<MessageDocument[]> => docSnapshots<MessageDocument>(
              doc(
                this.firestore,
                "/messages/" + user.uid,
              ) as DocumentReference<MessageDocument>,
            ).pipe<DocumentSnapshot<MessageDocument>, MessageDocument | undefined, MessageDocument, MessageDocument[]>(
              catchError<DocumentSnapshot<MessageDocument>, Observable<DocumentSnapshot<MessageDocument>>>(
                (): Observable<DocumentSnapshot<MessageDocument>> => this.createdMessageDocumentReferenceSubject.asObservable().pipe<DocumentSnapshot<MessageDocument>>(
                  switchMap<DocumentReference<MessageDocument>, Observable<DocumentSnapshot<MessageDocument>>>(
                    (messageDocumentReference: DocumentReference<MessageDocument>): Observable<DocumentSnapshot<MessageDocument>> => docSnapshots<MessageDocument>(messageDocumentReference).pipe<DocumentSnapshot<MessageDocument>>(
                      catchError<DocumentSnapshot<MessageDocument>, Observable<DocumentSnapshot<MessageDocument>>>(
                        () => new Observable<DocumentSnapshot<MessageDocument>>(),
                      ),
                    ),
                  ),
                ),
              ),
              map<DocumentSnapshot<MessageDocument>, MessageDocument | undefined>(
                (messageDocumentSnapshot: DocumentSnapshot<MessageDocument>): MessageDocument | undefined => messageDocumentSnapshot.data(),
              ),
              filter<MessageDocument | undefined, MessageDocument>(
                (messageDocument: MessageDocument | undefined): messageDocument is MessageDocument => !!messageDocument,
              ),
              map<MessageDocument, MessageDocument[]>(
                (messageDocument: MessageDocument): MessageDocument[] => [
                  messageDocument,
                ],
              ),
            ),
          ),
        ),
      ),
      startWith<MessageDocument[]>([]),
    ),
    {
      requireSync: true,
    },
  ) : signal<MessageDocument[]>([]);
  public readonly createMessageDocument: (messageDocument: MessageDocument) => Promise<void> = async (messageDocument: MessageDocument): Promise<void> => setDoc<MessageDocument, DocumentData>(
    doc(
      this.firestore,
      "/messages/" + this.authenticationService.user$()?.uid,
    ) as DocumentReference<MessageDocument>,
    messageDocument,
  )
    .then(
      (): void => this.createdMessageDocumentReferenceSubject.next(
        doc(
          this.firestore,
          "/messages/" + this.authenticationService.user$()?.uid,
        ) as DocumentReference<MessageDocument>,
      ),
    );

}
