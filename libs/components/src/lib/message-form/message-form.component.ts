import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from "@angular/core";
import { Analytics, logEvent }                                                             from "@angular/fire/analytics";
import { FormBuilder, FormGroup }                                                          from "@angular/forms";
import { MessageDocument }                                                                 from "@portfolio/interfaces";
import { AuthenticationService, EllipsesService, MessagesService, ResponsivityService }    from "@portfolio/services";
import { BehaviorSubject, Observable, Subscription }                                       from "rxjs";


type MessageFormStatus = "unsent" | "sending" | "sent"

@Component({
  selector: 'portfolio-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.sass'],
})
export class MessageFormComponent implements AfterViewInit, OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,

    Analytics: Analytics,
    AuthenticationService: AuthenticationService,
    EllipsesService: EllipsesService,
    FormBuilder: FormBuilder,
    MessagesService: MessagesService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .authenticationService = AuthenticationService;
    this
      .ellipsesService = EllipsesService;
    this
      .formGroup = FormBuilder
      .group({
        name: [""],
        message: [""],
        phone: [""],
        email: [""],
      });
    this
      .responsivityService = ResponsivityService;
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

        logEvent(Analytics, "form_submit", {
          "form_id": "",
          "form_name": "message",
          "form_destination": window.location.protocol + "//" + window.location.hostname + (window.location.port !== "" ? ":" + window.location.port : "") + "/",
        });

        MessagesService
          .createMessage(this.formGroup.value);
      };
    this
      .unsubscribeSentMessageDocument = MessagesService
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

  public readonly authenticationService: AuthenticationService;
  public readonly ellipsesService: EllipsesService;
  public readonly formGroup: FormGroup;
  public readonly messageStatusObservable: Observable<MessageFormStatus>;
  public readonly responsivityService: ResponsivityService;
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
