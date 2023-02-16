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
      .callback = new EventEmitter<void>();

    this
      .responsivityService = ResponsivityService;
  }

  @Output()
  callback: EventEmitter<void>;

  @Input()
  navigation?: boolean;

  @Input()
  svgName?: string;

  @Input()
  text?: string;

  @Input()
  url?: string;

  @Input()
  action?: boolean;

  public readonly responsivityService: ResponsivityService;
}
