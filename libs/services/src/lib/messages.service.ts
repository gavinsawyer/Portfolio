import { Injectable, Signal }                                                                                                                                     from "@angular/core";
import { toSignal }                                                                                                                                               from "@angular/core/rxjs-interop";
import { collection, CollectionReference, collectionSnapshots, doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore, QueryDocumentSnapshot, setDoc } from "@angular/fire/firestore";
import { MessageDocument }                                                                                                                                        from "@portfolio/interfaces";
import { catchError, filter, map, Observable, shareReplay, startWith, Subject, switchMap }                                                                        from "rxjs";
import { AuthenticationService }                                                                                                                                  from "./authentication.service";


@Injectable({
  providedIn: "root",
})
export class MessagesService {

  public readonly createMessageDocument: (messageDocument: MessageDocument) => Promise<void>;
  public readonly messageDocuments: Signal<MessageDocument[]>;

  private readonly createdMessageDocumentReference: Subject<DocumentReference<MessageDocument>>;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly firestore: Firestore,
  ) {
    this
      .createMessageDocument = async (messageDocument: MessageDocument): Promise<void> => setDoc<MessageDocument>(doc(firestore, "/messages/" + authenticationService.user()?.uid) as DocumentReference<MessageDocument>, messageDocument)
      .then((): void => this.createdMessageDocumentReference.next(doc(firestore, "/messages/" + authenticationService.user()?.uid) as DocumentReference<MessageDocument>));
    this
      .createdMessageDocumentReference = new Subject<DocumentReference<MessageDocument>>();
    this
      .messageDocuments = toSignal<MessageDocument[]>(collectionSnapshots<MessageDocument>(collection(firestore, "messages") as CollectionReference<MessageDocument>).pipe<MessageDocument[], MessageDocument[], MessageDocument[], MessageDocument[]>(
        map<QueryDocumentSnapshot<MessageDocument>[], MessageDocument[]>((messageDocumentSnapshots: QueryDocumentSnapshot<MessageDocument>[]): MessageDocument[] => messageDocumentSnapshots.map<MessageDocument>((messageDocumentSnapshot: QueryDocumentSnapshot<MessageDocument>): MessageDocument => messageDocumentSnapshot.data())),
        catchError<MessageDocument[], Observable<MessageDocument[]>>((): Observable<MessageDocument[]> => docSnapshots<MessageDocument>(doc(firestore, "/messages/" + authenticationService.user()?.uid) as DocumentReference<MessageDocument>).pipe<DocumentSnapshot<MessageDocument>, MessageDocument | undefined, MessageDocument, MessageDocument[]>(
          catchError<DocumentSnapshot<MessageDocument>, Observable<DocumentSnapshot<MessageDocument>>>((): Observable<DocumentSnapshot<MessageDocument>> => this.createdMessageDocumentReference.asObservable().pipe<DocumentSnapshot<MessageDocument>>(
            switchMap<DocumentReference<MessageDocument>, Observable<DocumentSnapshot<MessageDocument>>>((messageDocumentReference: DocumentReference<MessageDocument>): Observable<DocumentSnapshot<MessageDocument>> => docSnapshots(messageDocumentReference)),
          )),
          map<DocumentSnapshot<MessageDocument>, MessageDocument | undefined>((messageDocumentSnapshot: DocumentSnapshot<MessageDocument>): MessageDocument | undefined => messageDocumentSnapshot.data()),
          filter<MessageDocument | undefined, MessageDocument>((messageDocument): messageDocument is MessageDocument => !!messageDocument),
          map<MessageDocument, MessageDocument[]>((messageDocument: MessageDocument): MessageDocument[] => [messageDocument]),
        )),
        startWith<MessageDocument[]>([]),
        shareReplay<MessageDocument[]>(),
      ), {
        requireSync: true
      });
  }

}
