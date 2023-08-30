import { CommonModule, NgOptimizedImage }                                                                           from "@angular/common";
import { AfterViewInit, Component, ElementRef, Input, OnChanges, signal, SimpleChanges, ViewChild, WritableSignal } from "@angular/core";
import { Analytics, logEvent }                                                                                      from "@angular/fire/analytics";
import { FormControl, FormGroup, ReactiveFormsModule }                                                              from "@angular/forms";
import { MessageDocument }                                                                                          from "@portfolio/interfaces";
import { AuthenticationService, EllipsesService, MessagesService, ResponsivityService }                             from "@portfolio/services";
import { NgxMaskDirective, provideNgxMask }                                                                         from "ngx-mask";


interface CreateMessageForm {
  "email"?: FormControl<string>,
  "message": FormControl<string>,
  "name": FormControl<string>,
  "phone"?: FormControl<string>,
}

type Status = "unsent" | "pending" | "complete";

@Component({
  imports:     [
    CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  providers:   [
    provideNgxMask(),
  ],
  selector:    "portfolio-components-create-message-form",
  standalone:  true,
  styleUrls:   [
    "./CreateMessageFormComponent.sass",
  ],
  templateUrl: "./CreateMessageFormComponent.html",
})
export class CreateMessageFormComponent implements AfterViewInit, OnChanges {

  @Input({
    required: true,
  }) public messageDocuments!: MessageDocument[];

  public readonly formGroup: FormGroup<CreateMessageForm>;
  public readonly status:    WritableSignal<Status>;
  public readonly submit:    () => void;

  @ViewChild(
    "nameHTMLInputElement",
    {
      read: ElementRef,
    },
  ) private nameInputElementRef!: ElementRef;

  constructor(
    private readonly analytics:       Analytics,
    private readonly messagesService: MessagesService,

    public readonly authenticationService: AuthenticationService,
    public readonly ellipsesService:       EllipsesService,
    public readonly responsivityService:   ResponsivityService,
  ) {
    this
      .formGroup = new FormGroup<CreateMessageForm>(
        {
          email:   new FormControl<string>(
            "",
            {
              nonNullable: true,
            },
          ),
          message: new FormControl<string>(
            "",
            {
              nonNullable: true,
            },
          ),
          name:    new FormControl<string>(
            "",
            {
              nonNullable: true,
            },
          ),
          phone:   new FormControl<string>(
            "",
            {
              nonNullable: true,
            },
          ),
        }
      );
    this
      .status = signal<Status>("unsent");
    this
      .submit = async (): Promise<void> => (this.formGroup.value.email || this.formGroup.value.phone) && this
      .formGroup
      .value
      .message && this
      .formGroup
      .value
      .name ? (async (): Promise<void> => {
        this
          .formGroup
          .disable();

        this
          .status
          .set("pending");

        logEvent(
          this.analytics,
          "form_submit",
          {
            "form_id":          "",
            "form_name":        "message",
            "form_destination": window.location.protocol + "//" + window.location.hostname + (window.location.port !== "" ? ":" + window.location.port : "") + "/",
          },
        );

        return await this
          .messagesService
          .createMessageDocument(this.formGroup.getRawValue())
          .then<void>((): void => this.status.set("complete"))
          .catch<void>((): void => {
            this
              .formGroup
              .enable();

            this
              .status
              .set("unsent");
          });
      })() : void (0);
  }

  ngAfterViewInit(): void {
    this
      .nameInputElementRef
      .nativeElement
      .focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    (changes["messageDocuments"].currentValue as MessageDocument[])
      .length > 0 && ((): void => {
        this
          .formGroup
          .disable();
        this
          .formGroup
          .setValue(this.messageDocuments[0]);

        this
          .status
          .set("complete");
      })();
  }

}
