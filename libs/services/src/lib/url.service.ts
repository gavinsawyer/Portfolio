import { isPlatformServer }                                                                                                                                                                                                                                                                                 from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID }                                                                                                                                                                                                                                                       from "@angular/core";
import { ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent, RoutesRecognized, Scroll } from "@angular/router";
import { BehaviorSubject, filter, Observable, shareReplay, take }                                                                                                                                                                                                                                           from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UrlService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
    platform_id: string,

    Router: Router,
  ) {
    this
      .unsubscribeRouterEvents = Router
      .events
      .pipe(
        filter<RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd, NavigationEnd>((routerEvent: RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd): routerEvent is NavigationEnd => routerEvent instanceof NavigationEnd)
      )
      .subscribe((navigationEnd) => this.urlSubject.next(navigationEnd.url))
      .unsubscribe;
    this
      .urlSubject = new BehaviorSubject<string>(Router.url);
    this
      .urlObservable = this
      .urlSubject
      .asObservable()
      .pipe<string, string>(
        shareReplay<string>(),
        isPlatformServer(platform_id) ? take<string>(1) : filter<string>((): boolean => true)
      );

    isPlatformServer(platform_id) && this
      .unsubscribeRouterEvents();
  }

  private readonly unsubscribeRouterEvents: () => void;
  private readonly urlSubject: BehaviorSubject<string>;

  public readonly urlObservable: Observable<string>;

  ngOnDestroy(): void {
    this
      .unsubscribeRouterEvents();
  }

}
