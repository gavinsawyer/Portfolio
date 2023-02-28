import { Component }           from '@angular/core';
import { Analytics, logEvent } from "@angular/fire/analytics";
import { FocusService }        from "@portfolio/services";

@Component({
  selector: 'portfolio-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.sass'],
})
export class AsideComponent {

  constructor(
    private readonly analytics: Analytics,

    public readonly focusService: FocusService,
  ) {
    this
      .logClickAddToContactsEvent = (): void => logEvent(analytics, "click_addToContacts");
  }

  public readonly logClickAddToContactsEvent: () => void;

}
