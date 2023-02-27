import { isPlatformServer }                           from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable }                from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EllipsesService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
      platformId: string,
  ) {
    this
      .ellipsesInterval = setInterval((): void => this.ellipsesSubject.next(this.ellipsesSubject.value == "..." ? "." : this.ellipsesSubject.value + "."), 800);
    this
      .ellipsesSubject = new BehaviorSubject<string>(".");
    this
      .ellipsesObservable = this
      .ellipsesSubject
      .asObservable();

    isPlatformServer(platformId) && clearInterval(this.ellipsesInterval);
  }

  private readonly ellipsesSubject: BehaviorSubject<string>;
  private readonly ellipsesInterval: NodeJS.Timeout;

  public readonly ellipsesObservable: Observable<string>;

  ngOnDestroy(): void {
    clearInterval(this.ellipsesInterval);
  }

}
