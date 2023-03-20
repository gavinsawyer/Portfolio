import { Injectable, OnDestroy }                                                                                                                                  from "@angular/core";
import { User }                                                                                                                                                   from "@angular/fire/auth";
import { collection, CollectionReference, collectionSnapshots, doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore, QueryDocumentSnapshot, setDoc } from "@angular/fire/firestore";
import { MessageDocument }                                                                                                                                        from "@portfolio/interfaces";
import { catchError, filter, firstValueFrom, map, mergeMap, Observable, Subject, Subscription }                                                                   from "rxjs";
import { AuthenticationService }                                                                                                                                  from "./authentication.service";


@Injectable({
  providedIn: "root",
})
export class MessagesService implements OnDestroy {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly firestore: Firestore,
  ) {
    this
      .createMessageDocument = async (messageDocument: MessageDocument): Promise<void> => this
      .sentMessageDocumentSubject
      .next(((_: void): MessageDocument => messageDocument)(await setDoc<MessageDocument>(doc(firestore, "/messages/" + (await firstValueFrom(authenticationService.userObservable)).uid) as DocumentReference<MessageDocument>, messageDocument)));
    this
      .sentMessageDocumentSubject = new Subject<MessageDocument>();
    this
      .sentMessageDocumentObservable = this
      .sentMessageDocumentSubject
      .asObservable();
    this
      .messageDocumentsObservable = authenticationService
      .userObservable
      .pipe<QueryDocumentSnapshot<MessageDocument>[], MessageDocument[]>(
        mergeMap<User, Observable<QueryDocumentSnapshot<MessageDocument>[]>>((user: User): Observable<QueryDocumentSnapshot<MessageDocument>[]> => user.isAnonymous ? new Observable<QueryDocumentSnapshot<MessageDocument>[]>() : collectionSnapshots<MessageDocument>(collection(firestore, "messages") as CollectionReference<MessageDocument>)),
        map<QueryDocumentSnapshot<MessageDocument>[], MessageDocument[]>((messageDocumentSnapshots: QueryDocumentSnapshot<MessageDocument>[]): MessageDocument[] => messageDocumentSnapshots.map((messageDocumentSnapshot: QueryDocumentSnapshot<MessageDocument>): MessageDocument => messageDocumentSnapshot.data())),
      );
    this
      .unsubscribeSentMessageDocumentSnapshots = authenticationService
      .userObservable
      .pipe<DocumentSnapshot<MessageDocument>, MessageDocument | undefined, MessageDocument, MessageDocument>(
        mergeMap<User, Observable<DocumentSnapshot<MessageDocument>>>((user: User): Observable<DocumentSnapshot<MessageDocument>> => docSnapshots<MessageDocument>(doc(firestore, "/messages/" + user.uid) as DocumentReference<MessageDocument>)),
        map<DocumentSnapshot<MessageDocument>, MessageDocument | undefined>((messageDocumentSnapshot: DocumentSnapshot<MessageDocument>): MessageDocument | undefined => messageDocumentSnapshot.data()),
        filter<MessageDocument | undefined, MessageDocument>((messageDocument: MessageDocument | undefined): messageDocument is MessageDocument => !!messageDocument),
        catchError<MessageDocument, Observable<MessageDocument>>(() => new Subject<MessageDocument>().asObservable())
      )
      .subscribe((messageDocument: MessageDocument): void => this.sentMessageDocumentSubject.next(messageDocument))
      .unsubscribe;
  }

  private readonly sentMessageDocumentSubject: Subject<MessageDocument>;
  private readonly unsubscribeSentMessageDocumentSnapshots: Subscription["unsubscribe"];

  public readonly createMessageDocument: (messageDocument: MessageDocument) => Promise<void>;
  public readonly messageDocumentsObservable: Observable<MessageDocument[]>;
  public readonly sentMessageDocumentObservable: Observable<MessageDocument>;

  ngOnDestroy(): void {
    this
      .unsubscribeSentMessageDocumentSnapshots();
  }

}
