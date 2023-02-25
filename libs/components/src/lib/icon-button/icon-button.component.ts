import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ResponsivityService }                    from "@portfolio/services";

@Component({
  selector: 'portfolio-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.sass'],
})
export class IconButtonComponent {

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
  type?: string;

  @Input()
  url?: string;

}
