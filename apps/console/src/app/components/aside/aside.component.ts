import { CommonModule }                                from "@angular/common";
import { Component }                                   from "@angular/core";
import { Auth }                                        from "@angular/fire/auth";
import { Functions }                                   from "@angular/fire/functions";
import { signInWithPasskey, verifyUserWithPasskey }    from "@firebase-web-authn/browser";
import { ButtonComponent, CreateAccountFormComponent } from "@portfolio/components";
import { AuthenticationService }                       from "@portfolio/services";


@Component({
  imports: [
    ButtonComponent,
    CommonModule,
    CreateAccountFormComponent,
  ],
  selector: "portfolio-aside",
  standalone: true,
  styleUrls: [
    "./aside.component.sass",
  ],
  templateUrl: "./aside.component.html",
})
export class AsideComponent {

  constructor(
    private readonly auth: Auth,
    private readonly functions: Functions,

    public readonly authenticationService: AuthenticationService,
  ) {
    this
      .verifyUserWithPasskey = (): Promise<void> => verifyUserWithPasskey(auth, functions);
    this
      .signInWithPasskey = (): Promise<void> => signInWithPasskey(auth, functions)
      .then<void>((): void => void(0));
  }

  public readonly verifyUserWithPasskey: () => Promise<void>;
  public readonly signInWithPasskey: () => Promise<void>;

}