import { CommonModule, NgOptimizedImage }                                                                                         from "@angular/common";
import { AfterViewInit, Component, computed, effect, ElementRef, Inject, PLATFORM_ID, Signal, signal, ViewChild, WritableSignal } from "@angular/core";
import { Analytics, logEvent }                                                                                                    from "@angular/fire/analytics";
import { FormControl, FormGroup, ReactiveFormsModule }                                                                            from "@angular/forms";
import { AuthenticationService, EllipsesService, HyperResponsivityService, MessagesService }                                      from "@portfolio/services";
import { NgxMaskDirective, provideNgxMask }                                                                                       from "ngx-mask";


interface CreateMessageForm {
  "email"?: FormControl<string>,
  "message": FormControl<string>,
  "name": FormControl<string>,
  "phone"?: FormControl<string>,
}

type CreateMessageFormStatus = "unsent" | "pending" | "complete";

@Component({
  imports: [
    CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  providers: [
    provideNgxMask(),
  ],
  selector: "portfolio-create-message-form",
  standalone: true,
  styleUrls: [
    "./create-message-form.component.sass",
  ],
  templateUrl: "./create-message-form.component.html",
})
export class CreateMessageFormComponent implements AfterViewInit {

  public readonly createMessageFormGroup: FormGroup<CreateMessageForm>;
  public readonly createMessageFormStatus: Signal<CreateMessageFormStatus>;
  public readonly submit: () => void;

  @ViewChild("nameHTMLInputElement", {
    read: ElementRef,
  })
  private nameInputElementRef!: ElementRef;

  private readonly createMessageFormSubmitted: WritableSignal<boolean>;

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,

    private readonly analytics: Analytics,
    private readonly messagesService: MessagesService,

    public readonly authenticationService: AuthenticationService,
    public readonly ellipsesService: EllipsesService,
    public readonly hyperResponsivityService: HyperResponsivityService,
  ) {
    this
      .createMessageFormGroup = new FormGroup<CreateMessageForm>({
        email: new FormControl<string>("", {
          nonNullable: true,
        }),
        message: new FormControl<string>("", {
          nonNullable: true,
        }),
        name: new FormControl<string>("", {
          nonNullable: true,
        }),
        phone: new FormControl<string>("", {
          nonNullable: true,
        }),
      });
    this
      .createMessageFormStatus = computed<CreateMessageFormStatus>((): CreateMessageFormStatus => messagesService.messageDocuments().length > 0 ? "complete" : this.createMessageFormSubmitted() ? "pending" : "unsent");
    this
      .createMessageFormSubmitted = signal<boolean>(false);
    this
      .submit = async (): Promise<void> => {
        this
          .createMessageFormSubmitted
          .set(true);

        logEvent(analytics, "form_submit", {
          "form_id": "",
          "form_name": "message",
          "form_destination": window.location.protocol + "//" + window.location.hostname + (window.location.port !== "" ? ":" + window.location.port : "") + "/",
        });

        return await messagesService
          .createMessageDocument(this.createMessageFormGroup.getRawValue());
      };

    effect((): void => messagesService.messageDocuments().length > 0 ? ((): void => {
      this
        .createMessageFormGroup
        .setValue(messagesService.messageDocuments()[0]);

      this
        .createMessageFormGroup
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
