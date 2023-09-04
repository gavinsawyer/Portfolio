import { NgOptimizedImage }                                                                                                 from "@angular/common";
import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, signal, SimpleChanges, ViewChild, WritableSignal } from "@angular/core";
import { Analytics, logEvent }                                                                                              from "@angular/fire/analytics";
import { FormControl, FormGroup, ReactiveFormsModule }                                                                      from "@angular/forms";
import { MessageDocument }                                                                                                  from "@portfolio/interfaces";
import { AuthenticationService, EllipsesService, MessagesService, ResponsivityService }                                     from "@portfolio/services";
import { NgxMaskDirective, provideNgxMask }                                                                                 from "ngx-mask";


@Component({
  imports:     [
    NgxMaskDirective,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  providers:   [
    provideNgxMask(),
  ],
  selector:    "components-create-message-form",
  standalone:  true,
  styleUrls:   [
    "./CreateMessageFormComponent.sass",
  ],
  templateUrl: "./CreateMessageFormComponent.html",
})
export class CreateMessageFormComponent implements AfterViewInit, OnChanges {

  @ViewChild(
    "nameHTMLInputElement",
    {
      read: ElementRef,
    },
  ) private nameInputElementRef!: ElementRef;

  private readonly analytics:       Analytics       = inject<Analytics>(Analytics);
  private readonly messagesService: MessagesService = inject<MessagesService>(MessagesService);

  public readonly authenticationService: AuthenticationService                                                                                                                    = inject<AuthenticationService>(AuthenticationService);
  public readonly ellipsesService:       EllipsesService                                                                                                                          = inject<EllipsesService>(EllipsesService);
  public readonly responsivityService:   ResponsivityService                                                                                                                      = inject<ResponsivityService>(ResponsivityService);
  public readonly formGroup:             FormGroup<{ "email"?: FormControl<string>, "message": FormControl<string>, "name": FormControl<string>, "phone"?: FormControl<string> }> = new FormGroup<{ "email"?: FormControl<string>, "message": FormControl<string>, "name": FormControl<string>, "phone"?: FormControl<string> }>(
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
  public readonly status$:               WritableSignal<"unsent" | "pending" | "complete">                                                                                        = signal<"unsent" | "pending" | "complete">("unsent");
  public readonly submit:                () => Promise<void>                                                                                                                      = async (): Promise<void> => (this.formGroup.value.email || this.formGroup.value.phone) && this
    .formGroup
    .value
    .message && this
    .formGroup
    .value
    .name ? ((): Promise<void> => {
      this
        .formGroup
        .disable();
      this
        .status$
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

      return this
        .messagesService
        .createMessageDocument(this.formGroup.getRawValue())
        .then<void, void>(
          (): void => this.status$.set("complete"),
          (): void => {
            this
              .formGroup
              .enable();
            this
              .status$
              .set("unsent");
          },
        );
    })() : void (0);

  @Input({
    required: true,
  }) public messageDocuments!: MessageDocument[];

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
          .status$
          .set("complete");
      })();
  }

}
