import { isPlatformBrowser }                                                                                    from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID }                                                           from "@angular/core";
import { UserCredential }                                                                                       from "@angular/fire/auth";
import { doc, DocumentReference, DocumentSnapshot, Firestore, FirestoreError, onSnapshot, setDoc, Unsubscribe } from "@angular/fire/firestore";
import { MessageDocument }                                                                                      from "@portfolio/interfaces";
import { BehaviorSubject, filter, firstValueFrom, map, Observable }                                             from "rxjs";
import { AuthenticationService }                                                                                from "./authentication.service";


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
        AuthenticationService
          .userCredentialSubject
          .value && setDoc<MessageDocument>(doc(Firestore, "/messages/" + AuthenticationService.userCredentialSubject.value.user.uid) as DocumentReference<MessageDocument>, messageDocument)
          .then((): void => this.sentMessageSubject.next(messageDocument))
          .catch((reason: any): void => console.error(reason));
      };
    this
      .sentMessageSubject = new BehaviorSubject<MessageDocument | undefined>(undefined);
    this
      .sentMessageObservable = this
      .sentMessageSubject
      .asObservable();

    isPlatformBrowser(platformId) && ((callback: (userCredential: UserCredential) => void): void => ((userCredential?: UserCredential): void => userCredential ? callback(userCredential) : ((): void => {
      firstValueFrom(AuthenticationService.userCredentialObservable.pipe(
        filter<UserCredential | undefined>((userCredential?: UserCredential): boolean => !!userCredential),
        map<UserCredential | undefined, UserCredential>((userCredential?: UserCredential): UserCredential => userCredential as UserCredential)
      ))
        .then((userCredential: UserCredential): void => callback(userCredential))
        .catch((reason: any): void => console.error(reason));
    })())(AuthenticationService.userCredentialSubject.value))((userCredential: UserCredential): void => {
      this
        .unsubscribeSentMessageDocumentOnSnapshot = onSnapshot<MessageDocument>(doc(Firestore, "/messages/" + userCredential.user.uid) as DocumentReference<MessageDocument>, (sentMessageDocumentSnapshot: DocumentSnapshot<MessageDocument>): void => this.sentMessageSubject.next(sentMessageDocumentSnapshot.data()), (firestoreError: FirestoreError): void => {
          firestoreError
            .code == "permission-denied" || console
            .error(firestoreError);
        });
    });
  }

  private readonly sentMessageSubject: BehaviorSubject<MessageDocument | undefined>;
  private unsubscribeSentMessageDocumentOnSnapshot?: Unsubscribe;

  public readonly createMessage: (messageDocument: MessageDocument) => void;
  public readonly sentMessageObservable: Observable<MessageDocument | undefined>;


  ngOnDestroy(): void {
    this
      .unsubscribeSentMessageDocumentOnSnapshot
      ?.();
  }

}
