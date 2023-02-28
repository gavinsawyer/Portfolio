import { isPlatformBrowser }                                                                                       from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID }                                                              from "@angular/core";
import { User }                                                                                                    from "@angular/fire/auth";
import { doc, docSnapshots, DocumentReference, DocumentSnapshot, Firestore, setDoc }                               from "@angular/fire/firestore";
import { MessageDocument }                                                                                         from "@portfolio/interfaces";
import { catchError, filter, firstValueFrom, map, mergeMap, Observable, shareReplay, Subject, Subscription, take } from "rxjs";
import { AuthenticationService }                                                                                   from "./authentication.service";


@Injectable({
  providedIn: 'root'
})
export class MessagesService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,

    AuthenticationService: AuthenticationService,
    Firestore: Firestore,
  ) {
    this
      .createMessage = (messageDocument: MessageDocument): void => {
        firstValueFrom(AuthenticationService.userObservable)
          .then<void, void>((user: User): void => {
            setDoc<MessageDocument>(doc(Firestore, "/messages/" + user.uid) as DocumentReference<MessageDocument>, messageDocument)
              .then<void, void>((): void => this.messageSubject.next(messageDocument))
              .catch<void>((reason: any): void => console.error(reason));
          })
          .catch<void>((reason: any): void => console.error(reason))
      };
    this
      .messageSubject = new Subject<MessageDocument>();
    this
      .messageObservable = this
      .messageSubject
      .asObservable()
      .pipe<MessageDocument, MessageDocument>(
        shareReplay<MessageDocument>(),
        isPlatformBrowser(platformId) ? filter<MessageDocument>((): true => true) : take<MessageDocument>(1)
      );
    this
      .unsubscribeMessageDocumentOnSnapshot = AuthenticationService
      .userObservable
      .pipe<DocumentSnapshot<MessageDocument>, MessageDocument | undefined, MessageDocument | undefined>(
        mergeMap<User, Observable<DocumentSnapshot<MessageDocument>>>((user: User): Observable<DocumentSnapshot<MessageDocument>> => docSnapshots<MessageDocument>(doc(Firestore, "/messages/" + user.uid) as DocumentReference<MessageDocument>)),
        map<DocumentSnapshot<MessageDocument>, MessageDocument | undefined>((messageDocumentSnapshot: DocumentSnapshot<MessageDocument>): MessageDocument | undefined => messageDocumentSnapshot.data()),
        catchError<MessageDocument | undefined, Observable<MessageDocument>>(() => (new Subject<MessageDocument>()).asObservable())
      )
      .subscribe((messageDocument: MessageDocument | undefined): void => {
        messageDocument && this
          .messageSubject
          .next(messageDocument);
      })
      .unsubscribe;

    isPlatformBrowser(platformId) || this
      .unsubscribeMessageDocumentOnSnapshot();
  }

  private readonly messageSubject: Subject<MessageDocument>;
  private readonly unsubscribeMessageDocumentOnSnapshot: Subscription["unsubscribe"]

  public readonly createMessage: (messageDocument: MessageDocument) => void;
  public readonly messageObservable: Observable<MessageDocument>;


  ngOnDestroy(): void {
    this
      .unsubscribeMessageDocumentOnSnapshot();
  }

}
