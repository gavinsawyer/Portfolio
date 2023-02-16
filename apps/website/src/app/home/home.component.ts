import { Component }                         from "@angular/core";
import { FocusService, ResponsivityService } from "@portfolio/services";


@Component({
  selector: 'websiteApp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {

  constructor(
    FocusService: FocusService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .focusService = FocusService;
    this
      .responsivityService = ResponsivityService;
  };

  public readonly focusService: FocusService;
  public readonly responsivityService: ResponsivityService;
}
