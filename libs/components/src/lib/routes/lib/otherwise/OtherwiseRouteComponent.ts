import { isPlatformBrowser }                      from "@angular/common";
import { Component, inject, OnInit, PLATFORM_ID } from "@angular/core";
import { RESPONSE }                               from "@portfolio/injection-tokens";
import { PathService }                            from "@portfolio/services";
import { Response }                               from "express";
import { RouteComponent }                         from "../../../../";


@Component({
  selector:    "components-otherwise-route",
  standalone:  true,
  templateUrl: "./OtherwiseRouteComponent.html",
})
export class OtherwiseRouteComponent extends RouteComponent implements OnInit {

  private readonly platformId: object          = inject<object>(PLATFORM_ID);
  private readonly response:   Response | null = inject<Response | null>(
    RESPONSE,
    {
      optional: true,
    },
  );

  public readonly pathService: PathService = inject<PathService>(PathService);

  override ngOnInit(): void {
    super
      .ngOnInit();

    isPlatformBrowser(this.platformId) || this
      .response
      ?.status(404);
  }

}
