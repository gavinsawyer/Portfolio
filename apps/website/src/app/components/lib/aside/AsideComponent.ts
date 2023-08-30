import { CommonModule, NgOptimizedImage }                              from "@angular/common";
import { Component }                                                   from "@angular/core";
import { Analytics, logEvent }                                         from "@angular/fire/analytics";
import { ButtonComponent, CreateMessageFormComponent, FocusComponent } from "@portfolio/components";
import { FocusService, MessagesService }                               from "@portfolio/services";


@Component({
  imports:     [
    CommonModule,
    ButtonComponent,
    CreateMessageFormComponent,
    FocusComponent,
    NgOptimizedImage,
  ],
  selector:    "portfolio-website-aside",
  standalone:  true,
  styleUrls:   [
    "./AsideComponent.sass",
  ],
  templateUrl: "./AsideComponent.html",
})
export class AsideComponent {

  public readonly logClickAddToContactsEvent: () => void;
  public readonly logClickOpenResumeEvent: () => void;

  constructor(
    private readonly analytics: Analytics,

    public readonly focusService:    FocusService,
    public readonly messagesService: MessagesService,
  ) {
    this
      .logClickAddToContactsEvent = (): void => logEvent<"click_addToContacts">(
        this.analytics,
        "click_addToContacts",
      );
    this
      .logClickOpenResumeEvent = (): void => logEvent<"click_openResume">(
        this.analytics,
        "click_openResume",
      );
  }

}
