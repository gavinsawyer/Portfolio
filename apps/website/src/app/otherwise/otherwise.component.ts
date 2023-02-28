import { isPlatformBrowser }                        from "@angular/common";
import { Component, Inject, Optional, PLATFORM_ID } from "@angular/core";
import { UrlService }                               from "@portfolio/services";
import { RESPONSE }                                 from "@nguniversal/express-engine/tokens";
import { Response }                                 from "express"


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
    @Inject(RESPONSE)
      response: Response,

    UrlService: UrlService,
  ) {
    this
      .urlService = UrlService;

    isPlatformBrowser(platformId) || response
      .status(404);
  }

  public urlService: UrlService;

}
