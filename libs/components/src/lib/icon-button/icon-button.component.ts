import { CommonModule }                           from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HyperResponsivityService }               from "@portfolio/services";


@Component({
  imports: [
    CommonModule,
  ],
  selector: "portfolio-icon-button",
  standalone: true,
  styleUrls: [
    "./icon-button.component.sass",
  ],
  templateUrl: "./icon-button.component.html",
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
