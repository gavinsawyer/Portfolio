import { Component }              from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ResponsivityService }    from "@portfolio/services";

@Component({
  selector: 'portfolio-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.sass'],
})
export class MessageFormComponent {

  constructor(
    FormBuilder: FormBuilder,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .formGroup = FormBuilder
      .group({
        name: [""],
        message: [""],
        phone: [""],
        email: [""],
      });

    this
      .submit = (): void => console.log(this.formGroup.value);

    this
      .responsivityService = ResponsivityService;
  }

  public formGroup: FormGroup;
  public submit: () => void;

  public responsivityService: ResponsivityService;

}
