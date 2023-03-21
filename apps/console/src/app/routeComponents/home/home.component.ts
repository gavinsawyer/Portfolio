import { CommonModule }                           from "@angular/common";
import { Component }                              from "@angular/core";
import { ButtonComponent }                        from "@portfolio/components";
import { NgxFirebaseWebAuthnService }             from "@portfolio/ngx-firebase-web-authn";
import { AuthenticationService, MessagesService } from "@portfolio/services";


@Component({
  imports: [
    CommonModule,
    ButtonComponent,
  ],
  selector: "websiteApp-home",
  standalone: true,
  styleUrls: [
    "./home.component.sass",
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent {

  constructor(
    public readonly authenticationService: AuthenticationService,
    public readonly messagesService: MessagesService,
    public readonly ngxFirebaseWebAuthnService: NgxFirebaseWebAuthnService,
  ) {}

}
