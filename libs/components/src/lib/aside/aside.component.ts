import { Component }                         from '@angular/core';
import { Analytics, logEvent }               from "@angular/fire/analytics";
import { FocusService, ResponsivityService } from "@portfolio/services";

@Component({
  selector: 'portfolio-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass'],
})
export class AsideComponent {

  constructor(
    Analytics: Analytics,
    FocusService: FocusService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .focusService = FocusService;
    this
      .responsivityService = ResponsivityService;

    this
      .logClickAddToContactsEvent = (): void => logEvent(Analytics, "click_addToContacts");
  }

  public readonly focusService: FocusService;
  public readonly responsivityService: ResponsivityService;
  public readonly logClickAddToContactsEvent: () => void;
}
