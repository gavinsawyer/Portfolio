import { Component }  from "@angular/core";
import { UrlService } from "@portfolio/services";

@Component({
  selector: 'websiteApp-otherwise',
  templateUrl: './otherwise.component.html',
  styleUrls: ['./otherwise.component.sass'],
})
export class OtherwiseComponent {

  constructor(
    UrlService: UrlService,
  ) {
    this
      .urlService = UrlService;
  }

  public urlService: UrlService;

}
