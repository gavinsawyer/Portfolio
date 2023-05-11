import { CommonModule, NgOptimizedImage }         from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HyperResponsivityService }               from "@portfolio/services";


@Component({
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
  selector: "portfolio-button",
  standalone: true,
  styleUrls: [
    "./button.component.sass",
  ],
  templateUrl: "./button.component.html",
})
export class ButtonComponent {

  @Output()
  public readonly action: EventEmitter<void>;

  @Input()
  public iconHeight?: number;

  @Input()
  public iconName?: string;

  @Input()
  public iconWidth?: number;

  @Input({
    required: true,
  })
  public text?: string;

  @Input()
  public url?: string;

  constructor(
    public readonly hyperResponsivityService: HyperResponsivityService,
  ) {
    this
      .action = new EventEmitter<void>();
  }

}
