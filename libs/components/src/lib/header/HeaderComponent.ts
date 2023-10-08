import { NgClass }                      from "@angular/common";
import { Component }                    from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";


@Component({
  imports:     [
    RouterLink,
    RouterLinkActive,
    NgClass,
  ],
  selector:    "components-header",
  standalone:  true,
  styleUrls:   [
    "./HeaderComponent.sass",
  ],
  templateUrl: "./HeaderComponent.html",
})
export class HeaderComponent {
}
