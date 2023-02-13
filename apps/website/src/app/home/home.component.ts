import { Component, OnDestroy }                                                         from "@angular/core";
import { doc, DocumentReference, DocumentSnapshot, Firestore, onSnapshot, Unsubscribe } from "@angular/fire/firestore";
import { FormBuilder, FormGroup }                                                       from "@angular/forms";
import { ShortcutsAPIPublicDocument }                                                   from "@portfolio/interfaces";
import { ResponsivityService }                                                          from "@portfolio/services";
import { BehaviorSubject, Observable }                                                  from "rxjs";


@Component({
  selector: 'websiteApp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnDestroy {

  constructor(
    Firestore: Firestore,
    FormBuilder: FormBuilder,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .focusSubject = new BehaviorSubject("");
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot = onSnapshot<ShortcutsAPIPublicDocument>(doc(Firestore, "_/ZdrDhz5fPVSfBjOnAqwi") as DocumentReference<ShortcutsAPIPublicDocument>, (documentSnapshot: DocumentSnapshot<ShortcutsAPIPublicDocument>): void => ((shortcutsAPIPublicDocument?: ShortcutsAPIPublicDocument): void => this.focusSubject.next(shortcutsAPIPublicDocument ? shortcutsAPIPublicDocument.focus : ""))(documentSnapshot.data()));

    this
      .focusObservable = this
      .focusSubject
      .asObservable();
    this
      .messageForm = FormBuilder
      .group({
        message: [""],
      })
    this
      .submitMessageForm = (): void => {
        console
          .log(this.messageForm.value);
      };
    this
      .ResponsivityService = ResponsivityService;
  };

  private readonly focusSubject: BehaviorSubject<string>;
  private readonly unsubscribeShortcutsAPIPublicDocumentOnSnapshot: Unsubscribe;

  public readonly focusObservable: Observable<string>;
  public readonly messageForm: FormGroup;
  public readonly submitMessageForm: () => void;
  public readonly ResponsivityService: ResponsivityService;

  ngOnDestroy(): void {
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot();
  };
}
