import { Injectable, OnDestroy }                                                                from "@angular/core";
import { User }                                                                                 from "@angular/fire/auth";
import { doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore, setDoc }            from "@angular/fire/firestore";
import { MessageDocument }                                                                      from "@portfolio/interfaces";
import { catchError, filter, firstValueFrom, map, mergeMap, Observable, Subject, Subscription } from "rxjs";
import { AuthenticationService }                                                                from "./authentication.service";


@Injectable({
  providedIn: "root",
})
export class MessageService implements OnDestroy {

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly firestore: Firestore,
  ) {
    this
      .createMessageDocument = (messageDocument: MessageDocument): void => {
        firstValueFrom(authenticationService.userObservable)
          .then<void, void>((user: User): void => {
            setDoc<MessageDocument>(doc(firestore, "/messages/" + user.uid) as DocumentReference<MessageDocument>, messageDocument)
              .then<void, void>((): void => this.messageDocumentSubject.next(messageDocument))
              .catch<void>((reason: any): void => console.error(reason));
          })
          .catch<void>((reason: any): void => console.error(reason))
      };
    this
      .messageDocumentSubject = new Subject<MessageDocument>();
    this
      .messageDocumentObservable = this
      .messageDocumentSubject
      .asObservable();
    this
      .unsubscribeMessageDocumentOnSnapshot = authenticationService
      .userObservable
      .pipe<DocumentSnapshot<MessageDocument>, MessageDocument | undefined, MessageDocument, MessageDocument>(
        mergeMap<User, Observable<DocumentSnapshot<MessageDocument>>>((user: User): Observable<DocumentSnapshot<MessageDocument>> => docSnapshots<MessageDocument>(doc(firestore, "/messages/" + user.uid) as DocumentReference<MessageDocument>)),
        map<DocumentSnapshot<MessageDocument>, MessageDocument | undefined>((messageDocumentSnapshot: DocumentSnapshot<MessageDocument>): MessageDocument | undefined => messageDocumentSnapshot.data()),
        filter<MessageDocument | undefined, MessageDocument>((messageDocument: MessageDocument | undefined): messageDocument is MessageDocument => !!messageDocument),
        catchError<MessageDocument, Observable<MessageDocument>>(() => new Subject<MessageDocument>().asObservable())
      )
      .subscribe((messageDocument: MessageDocument): void => this.messageDocumentSubject.next(messageDocument))
      .unsubscribe;
  }

  private readonly messageDocumentSubject: Subject<MessageDocument>;
  private readonly unsubscribeMessageDocumentOnSnapshot: Subscription["unsubscribe"]

  public readonly createMessageDocument: (messageDocument: MessageDocument) => void;
  public readonly messageDocumentObservable: Observable<MessageDocument>;

  ngOnDestroy(): void {
    this
      .unsubscribeMessageDocumentOnSnapshot();
  }

}
