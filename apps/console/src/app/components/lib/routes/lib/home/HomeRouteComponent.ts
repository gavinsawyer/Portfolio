import { CommonModule }                           from "@angular/common";
import { Component, inject }                      from "@angular/core";
import { RouteComponent }                         from "@portfolio/components";
import { AuthenticationService, MessagesService } from "@portfolio/services";


@Component({
  imports:     [
    CommonModule,
  ],
  selector:    "portfolio-console-app-home",
  standalone:  true,
  styleUrls:   [
    "./HomeRouteComponent.sass",
  ],
  templateUrl: "./HomeRouteComponent.html",
})
export class HomeRouteComponent extends RouteComponent {

  public readonly authenticationService: AuthenticationService = inject(AuthenticationService);
  public readonly messagesService:       MessagesService       = inject(MessagesService);

}
