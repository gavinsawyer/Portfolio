import { CommonModule }                           from "@angular/common";
import { Component }                              from "@angular/core";
import { AuthenticationService, MessagesService } from "@portfolio/services";


@Component({
  imports:     [
    CommonModule,
  ],
  selector:    "console-app-home",
  standalone:  true,
  styleUrls:   [
    "./home.route.component.sass",
  ],
  templateUrl: "./home.route.component.html",
})
export class HomeRouteComponent {

  constructor(
    public readonly authenticationService: AuthenticationService,
    public readonly messagesService: MessagesService,
  ) {
  }

}
