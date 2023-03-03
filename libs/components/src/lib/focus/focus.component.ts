import { CommonModule } from "@angular/common";
import { Component }    from "@angular/core";
import { FocusService } from "@portfolio/services";


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

  constructor(
    public readonly focusService: FocusService,
  ) {}

}
