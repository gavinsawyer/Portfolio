import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup }                          from "@angular/forms";
import { FocusService, ResponsivityService }               from "@portfolio/services";


@Component({
  selector: 'websiteApp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements AfterViewInit {

  constructor(
    FormBuilder: FormBuilder,
    FocusService: FocusService,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .messageForm = FormBuilder
      .group({
        name: [""],
        message: [""],
        phone: [""],
        email: [""],
      });

    this
      .FocusService = FocusService;
    this
      .ResponsivityService = ResponsivityService;

    this
      .submitMessageForm = (): void => {
        console.log(this.messageForm.value)
      };
  };

  @ViewChild("nameHTMLInputElement", {
    read: ElementRef
  })
  private readonly nameElementRef!: ElementRef<HTMLInputElement>;

  public readonly FocusService: FocusService;
  public readonly messageForm: FormGroup;
  public readonly ResponsivityService: ResponsivityService;
  public readonly submitMessageForm: () => void;

  ngAfterViewInit(): void {
    this
      .nameElementRef
      .nativeElement
      .focus();
  }
}
