import { CommonModule, isPlatformBrowser }        from "@angular/common";
import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { RESPONSE }                               from "@nguniversal/express-engine/tokens";
import { PathService }                            from "@portfolio/services";
import { Response }                               from "express";
import { RouteComponent }                         from "../../../routes";


@Component({
  imports:     [
    CommonModule,
  ],
  selector:    "portfolio-components-otherwise-route",
  standalone:  true,
  styleUrls:   [
    "./OtherwiseRouteComponent.sass",
  ],
  templateUrl: "./OtherwiseRouteComponent.html",
})
export class OtherwiseRouteComponent extends RouteComponent implements OnInit {

  private readonly platformId: object   = inject(PLATFORM_ID);
  private readonly response:   Response = inject(RESPONSE);

  public readonly pathService: PathService = inject(PathService);

  override ngOnInit(): void {
    super
      .ngOnInit();

    isPlatformBrowser(this.platformId) || this
      .response
      .status(404);
  }

}
