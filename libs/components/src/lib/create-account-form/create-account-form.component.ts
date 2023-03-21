import { CommonModule }                                                         from "@angular/common";
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from "@angular/core";
import { UserCredential }                                                       from "@angular/fire/auth";
import { FormControl, FormGroup, ReactiveFormsModule }                          from "@angular/forms";
import { NgxFirebaseWebAuthnService }                                           from "@portfolio/ngx-firebase-web-authn";
import { AuthenticationService, EllipsesService, HyperResponsivityService }     from "@portfolio/services";
import { NgxMaskDirective, provideNgxMask }                                     from "ngx-mask";
import { BehaviorSubject, Observable }                                          from "rxjs";


interface LoginForm {
  "displayName"?: FormControl<string>,
}

type LoginFormStatus = "unsent" | "pending" | "complete";

@Component({
  imports: [
    CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule,
  ],
  providers: [
    provideNgxMask(),
  ],
  selector: "portfolio-create-account-form",
  standalone: true,
  styleUrls: [
    "./create-account-form.component.sass",
  ],
  templateUrl: "./create-account-form.component.html",
})
export class CreateAccountFormComponent implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,

    public readonly authenticationService: AuthenticationService,
    public readonly ellipsesService: EllipsesService,
    public readonly hyperResponsivityService: HyperResponsivityService,
    public readonly ngxFirebaseWebAuthnService: NgxFirebaseWebAuthnService,
  ) {
    this
      .formGroup = new FormGroup<LoginForm>({
        displayName: new FormControl("", {
          nonNullable: true,
        }),
      });
    this
      .statusSubject = new BehaviorSubject<LoginFormStatus>("unsent");
    this
      .statusObservable = this
      .statusSubject
      .asObservable();
    this
      .submit = async (): Promise<void> => {
        this
          .statusSubject
          .next("pending");

        return this
          .formGroup
          .value
          .displayName ? await ngxFirebaseWebAuthnService
          .createUserWithPasskey(this.formGroup.value.displayName)
          .then<void>((_userCredential: UserCredential): void => this.statusSubject.next("complete")) : this
          .statusSubject
          .next("unsent");
      };
  }

  @ViewChild("nameHTMLInputElement", {
    read: ElementRef
  })
  private nameInputElementRef!: ElementRef;

  private readonly statusSubject: BehaviorSubject<LoginFormStatus>;

  public readonly formGroup: FormGroup<LoginForm>;
  public readonly statusObservable: Observable<LoginFormStatus>;
  public readonly submit: () => void;

  ngAfterViewInit(): void {
    this
      .nameInputElementRef
      .nativeElement
      .focus();
  }

}
