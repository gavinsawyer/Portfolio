import { CommonModule, NgOptimizedImage }              from "@angular/common";
import { Component, signal, WritableSignal }           from "@angular/core";
import { Auth }                                        from "@angular/fire/auth";
import { Functions }                                   from "@angular/fire/functions";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { createUserWithPasskey }                       from "@firebase-web-authn/browser";
import { AuthenticationService, EllipsesService }      from "@portfolio/services";


interface CreateAccountForm {
  "displayName": FormControl<string>,
}

type Status = "unsent" | "pending" | "complete";

@Component({
  imports:     [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  selector:    "portfolio-create-account-form",
  standalone:  true,
  styleUrls:   [
    "./create-account-form.component.sass",
  ],
  templateUrl: "./create-account-form.component.html",
})
export class CreateAccountFormComponent {

  public readonly formGroup: FormGroup<CreateAccountForm>;
  public readonly status: WritableSignal<Status>;
  public readonly submit: () => void;

  constructor(
    public readonly authenticationService: AuthenticationService,
    public readonly ellipsesService: EllipsesService,
    auth: Auth,
    functions: Functions,
  ) {
    this
      .formGroup = new FormGroup<CreateAccountForm>(
      {
        displayName: new FormControl<string>(
          "",
          {
            nonNullable: true,
          },
        ),
      },
    );
    this
      .status = signal<Status>("unsent");
    this
      .submit = async (): Promise<void> => this
      .formGroup
      .value
      .displayName ? ((): Promise<void> => {
      this
        .formGroup
        .disable();

      this
        .status
        .set("pending");

      return createUserWithPasskey(
        auth,
        functions,
        this.formGroup.getRawValue().displayName,
      )
        .then<void, void>(
          (): void => this.status.set("complete"),
        )
        .catch<void>(
          (): void => {
            this
              .formGroup
              .enable();

            this
              .status
              .set("unsent");
          },
        );
    })() : void (0);
  }

}
