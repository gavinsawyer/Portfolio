import { isPlatformServer }                                                                                                                                                                                                                                                                                 from "@angular/common";
import { Inject, Injectable, OnDestroy, OnInit, PLATFORM_ID }                                                                                                                                                                                                                                               from "@angular/core";
import { ActivationEnd, ActivationStart, ChildActivationEnd, ChildActivationStart, GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, ResolveEnd, ResolveStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent, RoutesRecognized, Scroll } from "@angular/router";
import { Subject, filter, Observable, take }                                                                                                                                                                                                                                                                from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UrlService implements OnDestroy, OnInit {

  constructor(
    @Inject(PLATFORM_ID)
    platform_id: string,

    Router: Router,
  ) {
    this
      .router = Router;
    this
      .unsubscribeRouterEvents = Router
      .events
      .pipe(
        filter<RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd, NavigationEnd>((routerEvent: RouterEvent | NavigationStart | NavigationEnd | NavigationCancel | NavigationError | RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart | ResolveEnd): routerEvent is NavigationEnd => routerEvent instanceof NavigationEnd)
      )
      .subscribe((navigationEnd) => this.urlSubject.next(navigationEnd.url))
      .unsubscribe;
    this
      .urlSubject = new Subject<string>();
    this
      .urlObservable = this
      .urlSubject
      .asObservable()
      .pipe<string>(
        isPlatformServer(platform_id) ? take<string>(1) : filter<string>((): boolean => true)
      );

    isPlatformServer(platform_id) && this
      .unsubscribeRouterEvents();
  }

  private readonly router: Router;
  private readonly unsubscribeRouterEvents?: () => void;
  private readonly urlSubject: Subject<string>;

  public readonly urlObservable: Observable<string>;

  ngOnDestroy(): void {
    this
      .unsubscribeRouterEvents
      ?.();
  }

  ngOnInit(): void {
    this
      .urlSubject
      .next(this.router.url);
  }

}
