import { CommonModule }               from "@angular/common";
import { Component }                  from "@angular/core";
import { NgxFirebaseWebAuthnService } from "@portfolio/ngx-firebase-web-authn";
import { ButtonComponent }            from "../button/button.component";
import { CreateAccountFormComponent } from "../create-account-form/create-account-form.component";


@Component({
  imports: [
    ButtonComponent,
    CommonModule,
    CreateAccountFormComponent,
  ],
  selector: "portfolio-aside-console",
  standalone: true,
  styleUrls: [
    "./aside-console.component.sass",
  ],
  templateUrl: "./aside-console.component.html",
})
export class AsideConsoleComponent {

  constructor(
    public readonly ngxFirebaseWebAuthnService: NgxFirebaseWebAuthnService,
  ) {}

}
