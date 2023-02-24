import { Component, OnDestroy }                                                                                                                                                                                                                                                                             from "@angular/core";
import { ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent, RoutesRecognized, Scroll } from "@angular/router";
import { ResponsivityService }                                                                                                                                                                                                                                                                              from "@portfolio/services";
import { BehaviorSubject, filter, Observable }                                                                                                                                                                                                                                                              from "rxjs";


@Component({
  selector: 'websiteApp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnDestroy {

  constructor(
    Router: Router,
    ResponsivityService: ResponsivityService,
  ) {
    this
      .responsivityService = ResponsivityService;
    this
      .urlSubject = new BehaviorSubject<string>(Router.url);
    this
      .urlObservable = this
      .urlSubject;
    this
      .unsubscribeRouterEvents = Router
      .events
      .pipe(
        filter<RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd, NavigationEnd>((routerEvent: RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd): routerEvent is NavigationEnd => routerEvent instanceof NavigationEnd)
      )
      .subscribe((navigationEnd) => this.urlSubject.next(navigationEnd.url))
      .unsubscribe;
  }

  private readonly urlSubject: BehaviorSubject<string>;
  private readonly unsubscribeRouterEvents: () => void;

  public readonly responsivityService: ResponsivityService;
  public readonly urlObservable: Observable<string>;

  ngOnDestroy(): void {
    this
      .unsubscribeRouterEvents();
  }

}
