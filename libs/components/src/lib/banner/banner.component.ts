import { CommonModule } from "@angular/common";
import { Component }    from "@angular/core";


@Component({
  imports: [
    CommonModule,
  ],
  selector: "portfolio-banner",
  standalone: true,
  styleUrls: [
    "./banner.component.sass",
  ],
  templateUrl: "./banner.component.html",
})
export class BannerComponent {
}
