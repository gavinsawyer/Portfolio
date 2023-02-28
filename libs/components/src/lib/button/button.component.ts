import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HyperResponsivityService }               from "@portfolio/services";

@Component({
  selector: 'portfolio-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {

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
  text?: string;

  @Input()
  type?: string;

  @Input()
  url?: string;

}
