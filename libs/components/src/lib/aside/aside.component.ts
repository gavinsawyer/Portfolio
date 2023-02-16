import { Component }                         from '@angular/core';
import { FocusService, ResponsivityService } from "@portfolio/services";

@Component({
  selector: 'portfolio-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass'],
})
export class AsideComponent {

  constructor(
    FocusService: FocusService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .focusService = FocusService;
    this
      .responsivityService = ResponsivityService;
  }

  public readonly focusService: FocusService;
  public readonly responsivityService: ResponsivityService;
}
