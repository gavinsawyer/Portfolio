import { CommonModule, NgOptimizedImage }                                                                                                from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, Input, OnChanges, PLATFORM_ID, signal, SimpleChanges, ViewChild, WritableSignal } from "@angular/core";
import { Analytics, logEvent }                                                                                                           from "@angular/fire/analytics";
import { FormControl, FormGroup, ReactiveFormsModule }                                                                                   from "@angular/forms";
import { MessageDocument }                                                                                                               from "@portfolio/interfaces";
import { AuthenticationService, EllipsesService, HyperResponsivityService, MessagesService }                                             from "@portfolio/services";
import { NgxMaskDirective, provideNgxMask }                                                                                              from "ngx-mask";


interface CreateMessageForm {
  "email"?: FormControl<string>,
  "message": FormControl<string>,
  "name": FormControl<string>,
  "phone"?: FormControl<string>,
}

type Status = "unsent" | "pending" | "complete";

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
export class CreateMessageFormComponent implements AfterViewInit, OnChanges {

  public readonly formGroup: FormGroup<CreateMessageForm>;

  @Input({
    required: true,
  })
  public messageDocuments?: MessageDocument[];

  public readonly status: WritableSignal<Status>;
  public readonly submit: () => void;

  @ViewChild("nameHTMLInputElement", {
    read: ElementRef,
  })
  private nameInputElementRef!: ElementRef;

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
      .formGroup = new FormGroup<CreateMessageForm>({
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
      .status = signal<Status>("unsent");
    this
      .submit = async (): Promise<void> => {
        this
          .status
          .set("pending");

        logEvent(analytics, "form_submit", {
          "form_id": "",
          "form_name": "message",
          "form_destination": window.location.protocol + "//" + window.location.hostname + (window.location.port !== "" ? ":" + window.location.port : "") + "/",
        });

        return await messagesService
          .createMessageDocument(this.formGroup.getRawValue())
          .then<void>((): void => this.status.set("complete"));
      };
  }

  ngAfterViewInit(): void {
    this
      .nameInputElementRef
      .nativeElement
      .focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    (changes["messageDocuments"].currentValue as MessageDocument[]).length > 0 && ((): void => {
      this
        .formGroup
        .setValue(this.messageDocuments![0]);

      this
        .formGroup
        .disable();

      this
        .status
        .set("complete");
    })();
  }

}
