import { Inject, Injectable, OnDestroy, PLATFORM_ID }                                                                                                                                                                                                                                                       from "@angular/core";
import { ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent, RoutesRecognized, Scroll } from "@angular/router";
import { Subject, filter, Observable, shareReplay }                                                                                                                                                                                                                                                         from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PathService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,

    private readonly router: Router,
  ) {
    this
      .unsubscribeRouterEvents = router
      .events
      .pipe<NavigationEnd>(
        filter<RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd, NavigationEnd>((routerEvent: RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd): routerEvent is NavigationEnd => routerEvent instanceof NavigationEnd)
      )
      .subscribe((navigationEnd: NavigationEnd): void => this.pathSubject.next(navigationEnd.url.split("?")[0]))
      .unsubscribe;
    this
      .pathSubject = new Subject<string>();
    this
      .pathObservable = this
      .pathSubject
      .asObservable()
      .pipe<string>(
        shareReplay<string>()
      );
  }

  private readonly unsubscribeRouterEvents: () => void;
  private readonly pathSubject: Subject<string>;

  public readonly pathObservable: Observable<string>;

  ngOnDestroy(): void {
    this
      .unsubscribeRouterEvents();
  }

}
