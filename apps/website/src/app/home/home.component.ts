import { Component }                         from "@angular/core";
import { FormBuilder, FormGroup }            from "@angular/forms";
import { FocusService, ResponsivityService } from "@portfolio/services";


@Component({
  selector: 'websiteApp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {

  constructor(
    FormBuilder: FormBuilder,
    FocusService: FocusService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .messageForm = FormBuilder
      .group({
        message: [""],
      });

    this
      .FocusService = FocusService;
    this
      .ResponsivityService = ResponsivityService;

    this
      .submitMessageForm = (): void => {};
  };

  public readonly FocusService: FocusService;
  public readonly messageForm: FormGroup;
  public readonly ResponsivityService: ResponsivityService;
  public readonly submitMessageForm: () => void;
}
