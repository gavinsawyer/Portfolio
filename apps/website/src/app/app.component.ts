import { Component }                            from "@angular/core";
import { HyperResponsivityService, UrlService } from "@portfolio/services";


@Component({
  selector: 'websiteApp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {

  constructor(
    public readonly hyperResponsivityService: HyperResponsivityService,
    public readonly urlService: UrlService,
  ) {}

}
