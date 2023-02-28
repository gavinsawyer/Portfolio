import { isPlatformBrowser }                          from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, filter, Observable, take }  from "rxjs";


type Ellipses = "." | ".." | "..."

@Injectable({
  providedIn: 'root'
})
export class EllipsesService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,
  ) {
    this
      .ellipsesInterval = setInterval((): void => this.ellipsesSubject.next(this.ellipsesSubject.value == "..." ? "." as Ellipses : this.ellipsesSubject.value + "." as Ellipses), 800);
    this
      .ellipsesSubject = new BehaviorSubject<Ellipses>(".");
    this
      .ellipsesObservable = this
      .ellipsesSubject
      .asObservable()
      .pipe<Ellipses>(
        isPlatformBrowser(platformId) ? filter<Ellipses>((): true => true) : take<Ellipses>(1)
      );

    isPlatformBrowser(platformId) || clearInterval(this.ellipsesInterval);
  }

  private readonly ellipsesSubject: BehaviorSubject<Ellipses>;
  private readonly ellipsesInterval: NodeJS.Timeout;

  public readonly ellipsesObservable: Observable<Ellipses>;

  ngOnDestroy(): void {
    clearInterval(this.ellipsesInterval);
  }

}
