import { NgIf, NgOptimizedImage }                                      from "@angular/common";
import { Component, inject }                                           from "@angular/core";
import { Analytics, logEvent }                                         from "@angular/fire/analytics";
import { ButtonComponent, CreateMessageFormComponent, FocusComponent } from "@portfolio/components";
import { FocusService, MessagesService }                               from "@portfolio/services";


@Component({
  imports: [
    ButtonComponent,
    CreateMessageFormComponent,
    FocusComponent,
    NgIf,
    NgOptimizedImage,
  ],
  selector:    "website-aside",
  standalone:  true,
  styleUrls:   [
    "./AsideComponent.sass",
  ],
  templateUrl: "./AsideComponent.html",
})
export class AsideComponent {

  private readonly analytics: Analytics = inject<Analytics>(Analytics);

  public readonly focusService:               FocusService    = inject<FocusService>(FocusService);
  public readonly messagesService:            MessagesService = inject<MessagesService>(MessagesService);
  public readonly logClickAddToContactsEvent: () => void      = (): void => logEvent<"click_addToContacts">(
    this.analytics,
    "click_addToContacts",
  );
  public readonly logClickOpenResumeEvent:    () => void      = (): void => logEvent<"click_openResume">(
    this.analytics,
    "click_openResume",
  );

}
