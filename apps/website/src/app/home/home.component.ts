import { Component }                           from "@angular/core";
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { map, Observable }                     from "rxjs";


@Component({
  selector: 'websiteApp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent {
  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  public readonly backgroundAppearanceObservable: Observable<"light" | "dark"> = this
    .breakpointObserver
    .observe("(prefers-color-scheme: light)")
    .pipe(
      map((breakpointState: BreakpointState) => breakpointState.matches ? "light" : "dark")
    )

  public readonly foregroundAppearanceObservable: Observable<"dark" | "light"> = this
    .breakpointObserver
    .observe("(prefers-color-scheme: light)")
    .pipe(
      map((breakpointState: BreakpointState) => breakpointState.matches ? "dark" : "light")
    )
}
