import { isPlatformBrowser }                               from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                        from "@angular/core/rxjs-interop";
import { Ellipses }                                        from "@portfolio/types";
import { interval, map, startWith }                        from "rxjs";


@Injectable({
  providedIn: "root",
})
export class EllipsesService {

  private readonly platformId: object = inject(PLATFORM_ID);

  public readonly ellipses$: Signal<Ellipses> = isPlatformBrowser(this.platformId) ? toSignal<Ellipses>(
    interval(800).pipe<Ellipses, Ellipses>(
      map<number, Ellipses>(
        (n: number): Ellipses => ".".repeat(((n + 1) % 3) + 1) as Ellipses,
      ),
      startWith<Ellipses>("."),
    ),
    {
      requireSync: true,
    },
  ) : signal<Ellipses>(".");

}
