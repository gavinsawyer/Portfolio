import { NgIf }                                   from "@angular/common";
import { Component, inject }                      from "@angular/core";
import { RouteComponent }                         from "@portfolio/components";
import { AuthenticationService, MessagesService } from "@portfolio/services";


@Component({
  imports:     [
    NgIf,
  ],
  selector:    "console-home-route",
  standalone:  true,
  templateUrl: "./HomeRouteComponent.html",
})
export class HomeRouteComponent extends RouteComponent {

  public readonly authenticationService: AuthenticationService = inject<AuthenticationService>(AuthenticationService);
  public readonly messagesService:       MessagesService       = inject<MessagesService>(MessagesService);

}
