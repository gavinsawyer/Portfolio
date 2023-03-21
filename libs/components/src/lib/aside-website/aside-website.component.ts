import { CommonModule, NgOptimizedImage } from "@angular/common";
import { Component }                      from "@angular/core";
import { Analytics, logEvent }            from "@angular/fire/analytics";
import { FocusService }                   from "@portfolio/services";
import { ButtonComponent }                from "../button/button.component";
import { FocusComponent }                 from "../focus/focus.component";
import { MessageFormComponent }           from "../message-form/message-form.component";


@Component({
  imports: [
    CommonModule,
    ButtonComponent,
    FocusComponent,
    MessageFormComponent,
    NgOptimizedImage,
  ],
  selector: "portfolio-aside-website",
  standalone: true,
  styleUrls: [
    "./aside-website.component.sass",
  ],
  templateUrl: "./aside-website.component.html",
})
export class AsideWebsiteComponent {

  constructor(
    private readonly analytics: Analytics,

    public readonly focusService: FocusService,
  ) {
    this
      .logClickAddToContactsEvent = (): void => logEvent(analytics, "click_addToContacts");
  }

  public readonly logClickAddToContactsEvent: () => void;

}
