import { CommonModule, NgOptimizedImage }                                   from "@angular/common";
import { Component, computed, signal, Signal, WritableSignal }              from "@angular/core";
import { Auth }                                                             from "@angular/fire/auth";
import { Functions }                                                        from "@angular/fire/functions";
import { FormControl, FormGroup, ReactiveFormsModule }                      from "@angular/forms";
import { createUserWithPasskey }                                            from "@firebase-web-authn/browser";
import { AuthenticationService, EllipsesService, HyperResponsivityService } from "@portfolio/services";


interface CreateAccountForm {
  "displayName": FormControl<string>,
}

type CreateAccountFormStatus = "unsent" | "pending" | "complete";

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  selector: "portfolio-create-account-form",
  standalone: true,
  styleUrls: [
    "./create-account-form.component.sass",
  ],
  templateUrl: "./create-account-form.component.html",
})
export class CreateAccountFormComponent {

  public readonly createAccountFormGroup: FormGroup<CreateAccountForm>;
  public readonly createAccountFormStatus: Signal<CreateAccountFormStatus>;
  public readonly submit: () => void;

  private readonly createAccountFormCompleted: WritableSignal<boolean>;
  private readonly createAccountFormSubmitted: WritableSignal<boolean>;

  constructor(
    private readonly auth: Auth,
    private readonly functions: Functions,

    public readonly authenticationService: AuthenticationService,
    public readonly ellipsesService: EllipsesService,
    public readonly hyperResponsivityService: HyperResponsivityService,
  ) {
    this
      .createAccountFormGroup = new FormGroup<CreateAccountForm>({
        displayName: new FormControl<string>("", {
          nonNullable: true,
        }),
      });
    this
      .createAccountFormStatus = computed<CreateAccountFormStatus>((): CreateAccountFormStatus => this.createAccountFormCompleted() ? "complete" : this.createAccountFormSubmitted() ? "pending" : "unsent");
    this
      .createAccountFormCompleted = signal<boolean>(false);
    this
      .createAccountFormSubmitted = signal<boolean>(false);
    this
      .submit = async (): Promise<void> => {
        this
          .createAccountFormSubmitted
          .set(true);

        return this
          .createAccountFormGroup
          .value
          .displayName ? await createUserWithPasskey(auth, functions, this.createAccountFormGroup.getRawValue().displayName)
          .then<void, void>((): void => {
            this
              .createAccountFormGroup
              .disable();

            this
              .createAccountFormCompleted
              .set(true);
          })
          .catch<void>((): void => this.createAccountFormSubmitted.set(false)) : this
          .createAccountFormSubmitted
          .set(false);
      };
  }

}
