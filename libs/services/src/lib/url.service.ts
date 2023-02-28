import { Inject, Injectable, OnDestroy, PLATFORM_ID }                                                                                                                                                                                                                                                       from "@angular/core";
import { ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent, RoutesRecognized, Scroll } from "@angular/router";
import { Subject, filter, Observable, shareReplay }                                                                                                                                                                                                                                                         from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UrlService implements OnDestroy {

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
      .subscribe((navigationEnd: NavigationEnd): void => this.urlSubject.next(navigationEnd.url))
      .unsubscribe;
    this
      .urlSubject = new Subject<string>();
    this
      .urlObservable = this
      .urlSubject
      .asObservable()
      .pipe<string>(
        shareReplay<string>()
      );
  }

  private readonly unsubscribeRouterEvents: () => void;
  private readonly urlSubject: Subject<string>;

  public readonly urlObservable: Observable<string>;

  ngOnDestroy(): void {
    this
      .unsubscribeRouterEvents();
  }

}
