import { NgOptimizedImage }                            from "@angular/common";
import { Component, inject, signal, WritableSignal }   from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AuthenticationService, EllipsesService }      from "@portfolio/services";


@Component({
  imports:     [
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  selector:    "console-create-account-form",
  standalone:  true,
  styleUrls:   [
    "./CreateAccountFormComponent.sass",
  ],
  templateUrl: "./CreateAccountFormComponent.html",
})
export class CreateAccountFormComponent {

  public readonly authenticationService: AuthenticationService                             = inject<AuthenticationService>(AuthenticationService);
  public readonly ellipsesService:       EllipsesService                                   = inject<EllipsesService>(EllipsesService);
  public readonly formGroup:             FormGroup<{ "displayName": FormControl<string> }> = new FormGroup<{ "displayName": FormControl<string> }>(
    {
      displayName: new FormControl<string>(
        "",
        {
          nonNullable: true,
        },
      ),
    },
  );
  public readonly status$:               WritableSignal<"unsent" | "pending" | "complete"> = signal<"unsent" | "pending" | "complete">("unsent");
  public readonly submit:                () => void                                        = (): void => this
    .formGroup
    .value
    .displayName ? ((): void => {
      this
        .formGroup
        .disable();

      this
        .status$
        .set("pending");
    })() : void (0);

}
