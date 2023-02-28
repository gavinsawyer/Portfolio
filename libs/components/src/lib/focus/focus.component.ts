import { Component }    from "@angular/core";
import { FocusService } from "@portfolio/services";


@Component({
  selector: 'portfolio-focus',
  templateUrl: './focus.component.html',
  styleUrls: ['./focus.component.sass'],
})
export class FocusComponent {

  constructor(
    public readonly focusService: FocusService,
  ) {}

}
