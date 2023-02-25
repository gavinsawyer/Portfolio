import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ResponsivityService }                    from "@portfolio/services";

@Component({
  selector: 'portfolio-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {

  constructor(
    ResponsivityService: ResponsivityService,
  ) {
    this
      .click = new EventEmitter<void>();
    this
      .responsivityService = ResponsivityService;
  }

  @Output()
  click: EventEmitter<void>;

  public readonly responsivityService: ResponsivityService;

  @Input()
  svgName?: string;

  @Input()
  text?: string;

  @Input()
  type?: string;

  @Input()
  url?: string;

}
