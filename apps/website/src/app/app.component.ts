import { Component }                       from "@angular/core";
import { ResponsivityService, UrlService } from "@portfolio/services";


@Component({
  selector: 'websiteApp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {

  constructor(
    ResponsivityService: ResponsivityService,
    UrlService: UrlService,
  ) {
    this
      .responsivityService = ResponsivityService;
    this
      .urlService = UrlService;
  }

  public readonly responsivityService: ResponsivityService;
  public readonly urlService: UrlService;

}
