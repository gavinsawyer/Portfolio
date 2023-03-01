import { isPlatformBrowser }                        from "@angular/common";
import { Component, Inject, Optional, PLATFORM_ID } from "@angular/core";
import { PathService }                              from "@portfolio/services";
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
    private readonly platformId: Object,

    @Optional()
    @Inject(RESPONSE)
    private readonly response: Response,

    public readonly pathService: PathService,
  ) {
    isPlatformBrowser(platformId) || response
      .status(404);
  }

}
