import { CommonModule }                           from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HyperResponsivityService }               from "@portfolio/services";


@Component({
  imports: [
    CommonModule,
  ],
  selector: "portfolio-button",
  standalone: true,
  styleUrls: [
    "./button.component.sass",
  ],
  templateUrl: "./button.component.html",
})
export class ButtonComponent {

  constructor(
    public readonly hyperResponsivityService: HyperResponsivityService,
  ) {
    this
      .click = new EventEmitter<void>();
  }

  @Output()
  public readonly click: EventEmitter<void>;

  @Input()
  public svgHeight?: string;

  @Input()
  public svgName?: string;

  @Input()
  public svgWidth?: string;

  @Input()
  public text?: string;

  @Input()
  public type?: string;

  @Input()
  public url?: string;

}
