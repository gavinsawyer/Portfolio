import { Component }      from "@angular/core";
import { RouteComponent } from "@portfolio/components";


@Component({
  selector:    "website-privacy-route",
  standalone:  true,
  styleUrls:   [
    "./PrivacyRouteComponent.sass",
  ],
  templateUrl: "./PrivacyRouteComponent.html",
})
export class PrivacyRouteComponent extends RouteComponent {
}
