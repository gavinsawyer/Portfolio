import { DOCUMENT, isPlatformBrowser }                     from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                        from "@angular/core/rxjs-interop";
import { distinctUntilChanged, fromEvent, map, startWith } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ResponsivityService {

  public readonly scrollPosition$:       Signal<number>;

  public readonly adjustTextAreaRows: (messageTextAreaElement: HTMLTextAreaElement, options: { fontSize?: number, lineHeight?: number, min?: number, max?: number, }) => void;
  public readonly getTextAreaRows:    (messageTextAreaElement: HTMLTextAreaElement, options: { fontSize?: number, lineHeight?: number, min?: number, max?: number, }) => number;

  constructor(
    @Inject(DOCUMENT)    private readonly document:   Document,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
    this
      .scrollPosition$ = isPlatformBrowser(this.platformId) ? toSignal<number>(
        fromEvent<Event>(
          this.document,
          "scroll",
        ).pipe<number, number, number>(
          map<Event, number>(
            (): number => this.document.defaultView?.scrollY || 0,
          ),
          startWith<number, [ number ]>(this.document.defaultView?.scrollY || 0),
          distinctUntilChanged<number>(),
        ),
        {
          requireSync: true,
        },
      ) : signal<number>(0);

    this
      .adjustTextAreaRows = (textAreaElement: HTMLTextAreaElement, options: { fontSize?: number, lineHeight?: number, min?: number, max?: number, }): void => {
        textAreaElement
          .style
          .height = "0";

        textAreaElement
          .rows = this
          .getTextAreaRows(
            textAreaElement,
            options,
          );

        textAreaElement
          .style
          .height = "auto";
      };
    this
      .getTextAreaRows = (textAreaElement: HTMLTextAreaElement, options: { fontSize?: number, lineHeight?: number, min?: number, max?: number, }): number => Math
      .min(
        Math.max(
          Math.round(
            textAreaElement.scrollHeight / ((options.lineHeight || 1.15) * (options.fontSize || 1) * 16),
          ),
          options.min || 1,
        ),
        options.max || 256,
      );
  }

}
