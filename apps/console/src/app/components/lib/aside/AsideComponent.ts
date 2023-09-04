import { Component }       from "@angular/core";
import { ButtonComponent } from "@portfolio/components";


@Component({
  imports:     [
    ButtonComponent,
  ],
  selector:    "console-aside",
  standalone:  true,
  styleUrls:   [
    "./AsideComponent.sass",
  ],
  templateUrl: "./AsideComponent.html",
})
export class AsideComponent {
}
