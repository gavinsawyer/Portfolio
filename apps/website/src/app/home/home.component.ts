import { AfterContentInit, Component, ElementRef, OnDestroy, ViewChild }   from "@angular/core";
import { doc, DocumentReference, DocumentSnapshot, Firestore, onSnapshot } from "@angular/fire/firestore";
import { FormBuilder, FormGroup }                                          from "@angular/forms";
import { ShortcutsAPIPublicDocument }                                      from "@portfolio/interfaces";
import { ResponsivityService }                                             from "@portfolio/services";


@Component({
  selector: 'websiteApp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements AfterContentInit, OnDestroy {

  private readonly unsubscribeShortcutsAPIPublicDocumentOnSnapshot;

  constructor(
    Firestore: Firestore,
    FormBuilder: FormBuilder,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .ResponsivityService = ResponsivityService;

    this
      .focus = "";
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot = onSnapshot<ShortcutsAPIPublicDocument>(doc(Firestore, "_/ZdrDhz5fPVSfBjOnAqwi") as DocumentReference<ShortcutsAPIPublicDocument>, (documentSnapshot: DocumentSnapshot<ShortcutsAPIPublicDocument>): void => ((shortcutsAPIPublicDocument?: ShortcutsAPIPublicDocument): void => {
        this
          .focus = shortcutsAPIPublicDocument ? shortcutsAPIPublicDocument.focus : "";
      })(documentSnapshot.data()));

    this
      .messageForm = FormBuilder
      .group({
        message: [""],
      });

    this
      .ngAfterContentInit = (): void => {
        this
          .messageTextAreaElementRef
          .nativeElement
          .focus();
      };
    this
      .ngOnDestroy = (): void => {
        this
          .unsubscribeShortcutsAPIPublicDocumentOnSnapshot();
      };
  };

  @ViewChild("messageTextAreaElement")
  public readonly messageTextAreaElementRef!: ElementRef;

  public ResponsivityService: ResponsivityService;

  public focus: string;

  public readonly messageForm: FormGroup;

  ngAfterContentInit: () => void;
  ngOnDestroy: () => void;
}
