import { CommonModule }     from "@angular/common";
import { Component, Input } from "@angular/core";


@Component({
  imports: [
    CommonModule,
  ],
  selector: "portfolio-focus",
  standalone: true,
  styleUrls: [
    "./focus.component.sass",
  ],
  templateUrl: "./focus.component.html",
})
export class FocusComponent {

  @Input({
    required: true,
  })
  public focus?: string;

}
