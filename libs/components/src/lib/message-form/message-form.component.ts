import { Component, OnDestroy }                                        from "@angular/core";
import { FormBuilder, FormGroup }                                      from "@angular/forms";
import { MessageDocument, MessageFormStatus }                          from "@portfolio/interfaces";
import { AuthenticationService, MessagesService, ResponsivityService } from "@portfolio/services";
import { BehaviorSubject, Observable, Subscription }                   from "rxjs";
import { EllipsesService }                                             from "../../../../services/src/lib/ellipses.service";


@Component({
  selector: 'portfolio-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.sass'],
})
export class MessageFormComponent implements OnDestroy {

  constructor(
    AuthenticationService: AuthenticationService,
    EllipsesService: EllipsesService,
    FormBuilder: FormBuilder,
    MessagesService: MessagesService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .statusSubject = new BehaviorSubject<MessageFormStatus>("unsent");
    this
      .statusObservable = this
      .statusSubject
      .asObservable();

    this
      .unsubscribeSentMessageDocument = MessagesService
      .sentMessageObservable
      .subscribe((sentMessageDocument?: MessageDocument): void => sentMessageDocument && ((): void => {
        this
          .formGroup
          .setValue({
            ...sentMessageDocument,
          });

        this
          .formGroup
          .disable();

        this
          .statusSubject
          .next("sent");
      })())
      .unsubscribe;

    this
      .authenticationService = AuthenticationService;
    this
      .ellipsesService = EllipsesService;
    this
      .responsivityService = ResponsivityService;

    this
      .formGroup = FormBuilder
      .group({
        name: [""],
        message: [""],
        phone: [""],
        email: [""],
      });
    this
      .submit = (): void => {
        this
          .statusSubject
          .next("sending");

        MessagesService
          .createMessage(this.formGroup.value);
      };
  }

  private readonly statusSubject: BehaviorSubject<MessageFormStatus>;
  private readonly unsubscribeSentMessageDocument: Subscription["unsubscribe"];

  public readonly statusObservable: Observable<MessageFormStatus>;

  public readonly authenticationService: AuthenticationService;
  public readonly ellipsesService: EllipsesService;
  public readonly responsivityService: ResponsivityService;
  public readonly formGroup: FormGroup;
  public readonly submit: () => void;

  ngOnDestroy(): void {
    this
      .unsubscribeSentMessageDocument();
  }

}
