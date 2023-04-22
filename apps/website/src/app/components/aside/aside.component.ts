import { CommonModule, NgOptimizedImage }                        from "@angular/common";
import { Component }                                             from "@angular/core";
import { Analytics, logEvent }                                   from "@angular/fire/analytics";
import { ButtonComponent, FocusComponent, MessageFormComponent } from "@portfolio/components";
import { FocusService }                                          from "@portfolio/services";


@Component({
  imports: [
    CommonModule,
    ButtonComponent,
    FocusComponent,
    MessageFormComponent,
    NgOptimizedImage,
  ],
  selector: "portfolio-aside",
  standalone: true,
  styleUrls: [
    "./aside.component.sass",
  ],
  templateUrl: "./aside.component.html",
})
export class AsideComponent {

  constructor(
    private readonly analytics: Analytics,

    public readonly focusService: FocusService,
  ) {
    this
      .logClickAddToContactsEvent = (): void => logEvent(analytics, "click_addToContacts");
    this
      .logClickOpenResumeEvent = (): void => logEvent(analytics, "click_openResume");
  }

  public readonly logClickAddToContactsEvent: () => void;
  public readonly logClickOpenResumeEvent: () => void;

}
