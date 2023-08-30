import { CommonModule }                                        from "@angular/common";
import { Component }                                           from "@angular/core";
import { ButtonComponent }                                     from "@portfolio/components";


@Component({
  imports:     [
    ButtonComponent,
    CommonModule,
  ],
  selector:    "portfolio-console-aside",
  standalone:  true,
  styleUrls:   [
    "./AsideComponent.sass",
  ],
  templateUrl: "./AsideComponent.html",
})
export class AsideComponent {
}
