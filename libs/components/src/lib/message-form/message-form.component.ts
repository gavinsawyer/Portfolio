import { CommonModule }                                                                                                           from "@angular/common";
import { AfterViewInit, Component, computed, effect, ElementRef, Inject, PLATFORM_ID, Signal, signal, ViewChild, WritableSignal } from "@angular/core";
import { Analytics, logEvent }                                                                                                    from "@angular/fire/analytics";
import { FormBuilder, FormGroup, ReactiveFormsModule }                                                                     from "@angular/forms";
import { MessageDocument }                                                                                                 from "@portfolio/interfaces";
import { AuthenticationService, EllipsesService, HyperResponsivityService, MessagesService }                               from "@portfolio/services";
import { NgxMaskDirective, provideNgxMask }                                                                                from "ngx-mask";


type MessageStatus = "unsent" | "sending" | "sent";

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
export class MessageFormComponent implements AfterViewInit {

  public readonly formGroup: FormGroup;
  public readonly messageStatus: Signal<MessageStatus>;
  public readonly submit: () => void;

  @ViewChild("nameHTMLInputElement", {
    read: ElementRef,
  })
  private nameInputElementRef!: ElementRef;

  private readonly formSubmitted: WritableSignal<boolean>;

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
      .group<MessageDocument>({
        email: undefined,
        message: "",
        name: "",
        phone: undefined,
      });
    this
      .formSubmitted = signal<boolean>(false);
    this
      .messageStatus = computed<MessageStatus>((): MessageStatus => messagesService.messageDocuments().length > 0 ? "sent" : this.formSubmitted() ? "sending" : "unsent");
    this
      .submit = async (): Promise<void> => {
        this
          .formSubmitted
          .set(true);

        logEvent(analytics, "form_submit", {
          "form_id": "",
          "form_name": "message",
          "form_destination": window.location.protocol + "//" + window.location.hostname + (window.location.port !== "" ? ":" + window.location.port : "") + "/",
        });

        return await messagesService
          .createMessageDocument(this.formGroup.value);
      };

    effect((): void => messagesService.messageDocuments().length > 0 ? ((): void => {
      this
        .formGroup
        .setValue(messagesService.messageDocuments()[0]);

      this
        .formGroup
        .disable();
    })() : void (0));
  }

  ngAfterViewInit(): void {
    this
      .nameInputElementRef
      .nativeElement
      .focus();
  }

}
