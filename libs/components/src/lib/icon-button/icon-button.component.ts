import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HyperResponsivityService }               from "@portfolio/services";

@Component({
  selector: 'portfolio-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.sass'],
})
export class IconButtonComponent {

  constructor(
    public readonly hyperResponsivityService: HyperResponsivityService,
  ) {
    this
      .click = new EventEmitter<void>();
  }

  @Output()
  click: EventEmitter<void>;

  @Input()
  svgHeight?: string;

  @Input()
  svgName?: string;

  @Input()
  svgWidth?: string;

  @Input()
  type?: string;

  @Input()
  url?: string;

}
