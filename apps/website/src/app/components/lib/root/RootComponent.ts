import { Component, inject }                from "@angular/core";
import { GIT_INFO, PACKAGE_VERSION }        from "@portfolio/injection-tokens";
import { PathService, ResponsivityService } from "@portfolio/services";
import { GitInfo }                          from "git-describe";


@Component({
  selector:    "website-root",
  styleUrls:   [
    "./RootComponent.sass",
  ],
  templateUrl: "./RootComponent.html",
})
export class RootComponent {

  public readonly gitInfo:             Partial<GitInfo>    = inject<Partial<GitInfo>>(GIT_INFO);
  public readonly packageVersion:      string              = inject<string>(PACKAGE_VERSION);
  public readonly pathService:         PathService         = inject<PathService>(PathService);
  public readonly responsivityService: ResponsivityService = inject<ResponsivityService>(ResponsivityService);

}
