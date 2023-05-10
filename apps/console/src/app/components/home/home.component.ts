import { CommonModule }                           from "@angular/common";
import { Component }                              from "@angular/core";
import { AuthenticationService, MessagesService } from "@portfolio/services";


@Component({
  imports: [
    CommonModule,
  ],
  selector: "console-app-home",
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
  ) {
  }

}
