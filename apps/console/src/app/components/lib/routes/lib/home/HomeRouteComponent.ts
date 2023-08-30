import { CommonModule }                           from "@angular/common";
import { Component, Input, OnInit }               from "@angular/core";
import { Meta }                                   from "@angular/platform-browser";
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
export class HomeRouteComponent implements OnInit {

  @Input({
    required: true,
  }) private readonly description!: string;

  constructor(
    private readonly meta: Meta,

    public readonly authenticationService: AuthenticationService,
    public readonly messagesService:       MessagesService,
  ) {
  }

  ngOnInit(): void {
    this
      .meta
      .updateTag(
        {
          "name": "description",
          "content": this.description,
        },
      );
  }

}
