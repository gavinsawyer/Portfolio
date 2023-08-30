import { CommonModule } from "@angular/common";
import { Component }    from "@angular/core";


@Component({
  imports:     [
    CommonModule,
  ],
  selector:    "portfolio-components-banner",
  standalone:  true,
  styleUrls:   [
    "./BannerComponent.sass",
  ],
  templateUrl: "./BannerComponent.html",
})
export class BannerComponent {
}
