import { CommonModule, NgOptimizedImage }              from "@angular/common";
import { Component, signal, WritableSignal }           from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationService, EllipsesService }      from "@portfolio/services";


@Component({
  imports:     [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  selector:    "portfolio-console-create-account-form",
  standalone:  true,
  styleUrls:   [
    "./CreateAccountFormComponent.sass",
  ],
  templateUrl: "./CreateAccountFormComponent.html",
})
export class CreateAccountFormComponent {

  public readonly formGroup: FormGroup<{ "displayName": FormControl<string> }>;
  public readonly status:    WritableSignal<"unsent" | "pending" | "complete">;
  public readonly submit:    () => void;

  constructor(
    public readonly authenticationService: AuthenticationService,
    public readonly ellipsesService:       EllipsesService,
  ) {
    this
      .formGroup = new FormGroup<{ "displayName": FormControl<string> }>(
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
      .status = signal<"unsent" | "pending" | "complete">("unsent");
    this
      .submit = (): void => this
      .formGroup
      .value
      .displayName ? ((): void => {
        this
          .formGroup
          .disable();

        this
          .status
          .set("pending");
      })() : void (0);
  }

}
