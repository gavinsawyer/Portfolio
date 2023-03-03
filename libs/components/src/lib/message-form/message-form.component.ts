import { CommonModule }                                                                      from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild }   from "@angular/core";
import { Analytics, logEvent }                                                               from "@angular/fire/analytics";
import { FormBuilder, FormGroup, ReactiveFormsModule }                                       from "@angular/forms";
import { MessageDocument }                                                                   from "@portfolio/interfaces";
import { AuthenticationService, EllipsesService, HyperResponsivityService, MessagesService } from "@portfolio/services";
import { NgxMaskDirective, provideNgxMask }                                                  from "ngx-mask";
import { BehaviorSubject, Observable, Subscription }                                         from "rxjs";


type MessageFormStatus = "unsent" | "sending" | "sent"

@Component({
  imports: [
    CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  providers: [
    provideNgxMask(),
  ],
  selector: "portfolio-message-form",
  standalone: true,
  styleUrls: [
    "./message-form.component.sass",
  ],
  templateUrl: "./message-form.component.html",
})
export class MessageFormComponent implements AfterViewInit, OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,

    private readonly analytics: Analytics,
    private readonly formBuilder: FormBuilder,
    private readonly messagesService: MessagesService,

    public readonly authenticationService: AuthenticationService,
    public readonly ellipsesService: EllipsesService,
    public readonly hyperResponsivityService: HyperResponsivityService,
  ) {
    this
      .formGroup = formBuilder
      .group({
        name: [""],
        message: [""],
        phone: [""],
        email: [""],
      });
    this
      .messageStatusSubject = new BehaviorSubject<MessageFormStatus>("unsent");
    this
      .messageStatusObservable = this
      .messageStatusSubject
      .asObservable();
    this
      .submit = (): void => {
        this
          .messageStatusSubject
          .next("sending");

        logEvent(analytics, "form_submit", {
          "form_id": "",
          "form_name": "message",
          "form_destination": window.location.protocol + "//" + window.location.hostname + (window.location.port !== "" ? ":" + window.location.port : "") + "/",
        });

      messagesService
          .createMessage(this.formGroup.value);
      };
    this
      .unsubscribeSentMessageDocument = messagesService
      .messageObservable
      .subscribe((messageDocument?: MessageDocument): void => messageDocument && ((): void => {
        this
          .formGroup
          .setValue(messageDocument);

        this
          .formGroup
          .disable();

        this
          .messageStatusSubject
          .next("sent");
      })())
      .unsubscribe;
  }

  @ViewChild("nameHTMLInputElement", {
    read: ElementRef
  })
  private nameInputElementRef!: ElementRef;

  private readonly messageStatusSubject: BehaviorSubject<MessageFormStatus>;
  private readonly unsubscribeSentMessageDocument: Subscription["unsubscribe"];

  public readonly formGroup: FormGroup;
  public readonly messageStatusObservable: Observable<MessageFormStatus>;
  public readonly submit: () => void;

  ngAfterViewInit(): void {
    this
      .nameInputElementRef
      .nativeElement
      .focus();
  }

  ngOnDestroy(): void {
    this
      .unsubscribeSentMessageDocument();
  }

}
