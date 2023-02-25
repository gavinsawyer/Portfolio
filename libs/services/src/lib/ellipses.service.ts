import { isPlatformServer }                                       from "@angular/common";
import { Inject, Injectable, OnDestroy, PLATFORM_ID }             from "@angular/core";
import { BehaviorSubject, filter, Observable, shareReplay, take } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class EllipsesService implements OnDestroy {

  constructor(
    @Inject(PLATFORM_ID)
    platform_id: string,
  ) {
    this
      .ellipsesInterval = setInterval((): void => this.ellipsesSubject.next(this.ellipsesSubject.value == "..." ? "." : this.ellipsesSubject.value + "."), 800);
    this
      .ellipsesSubject = new BehaviorSubject<string>(".");
    this
      .ellipsesObservable = this
      .ellipsesSubject
      .asObservable()
      .pipe<string, string>(
        shareReplay<string>(),
        isPlatformServer(platform_id) ? take<string>(1) : filter<string>((): boolean => true)
      );

    isPlatformServer(platform_id) && clearInterval(this.ellipsesInterval);
  }

  private readonly ellipsesSubject: BehaviorSubject<string>;
  private readonly ellipsesInterval: NodeJS.Timeout;

  public readonly ellipsesObservable: Observable<string>;

  ngOnDestroy(): void {
    clearInterval(this.ellipsesInterval);
  }

}
