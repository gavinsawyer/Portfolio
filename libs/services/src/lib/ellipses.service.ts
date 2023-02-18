import { Injectable }                  from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EllipsesService {

  constructor() {
    this
      .ellipsesSubject = new BehaviorSubject<string>(".");
    this
      .ellipsesObservable = this
      .ellipsesSubject
      .asObservable();

    setInterval((): void => {
      this
        .ellipsesSubject
        .next(this.ellipsesSubject.value !== "..." ? this.ellipsesSubject.value + "." : ".");
    }, 800);
  }

  private readonly ellipsesSubject: BehaviorSubject<string>;

  public readonly ellipsesObservable: Observable<string>;

}
