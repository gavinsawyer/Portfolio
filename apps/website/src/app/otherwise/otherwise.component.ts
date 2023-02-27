import { isPlatformServer }                         from "@angular/common";
import { Component, Inject, Optional, PLATFORM_ID } from "@angular/core";
import { UrlService }                               from "@portfolio/services";
import { REQUEST }                                  from "@nguniversal/express-engine/tokens";
import { Request }                                  from "express"


@Component({
  selector: 'websiteApp-otherwise',
  templateUrl: './otherwise.component.html',
  styleUrls: ['./otherwise.component.sass'],
})
export class OtherwiseComponent {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,

    @Optional()
    @Inject(REQUEST)
      request: Request,

    UrlService: UrlService,
  ) {
    this
      .urlService = UrlService;

    isPlatformServer(platformId) && request
      .res
      ?.status(404);
  }

  public urlService: UrlService;

}
