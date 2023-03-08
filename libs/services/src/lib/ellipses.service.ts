import { isPlatformBrowser }                          from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable }                from "rxjs";
import { Ellipses }                                   from "../../../types/src/ellipses";


@Injectable({
  providedIn: "root",
})
export class EllipsesService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
    private readonly platformId: Object,
  ) {
    this
      .ellipsesInterval = setInterval((): void => this.ellipsesSubject.next(this.ellipsesSubject.value == "..." ? "." as Ellipses : this.ellipsesSubject.value + "." as Ellipses), 800);
    this
      .ellipsesSubject = new BehaviorSubject<Ellipses>(".");
    this
      .ellipsesObservable = this
      .ellipsesSubject
      .asObservable();

    isPlatformBrowser(platformId) || clearInterval(this.ellipsesInterval);
  }

  private readonly ellipsesSubject: BehaviorSubject<Ellipses>;
  private readonly ellipsesInterval: NodeJS.Timeout;

  public readonly ellipsesObservable: Observable<Ellipses>;

  ngOnDestroy(): void {
    clearInterval(this.ellipsesInterval);
  }

}
