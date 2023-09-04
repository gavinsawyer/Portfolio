import { DOCUMENT, isPlatformBrowser }                     from "@angular/common";
import { inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                        from "@angular/core/rxjs-interop";
import { distinctUntilChanged, fromEvent, map, startWith } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class ResponsivityService {

  private readonly document: Document = inject<Document>(DOCUMENT);

  public readonly scrollPosition$:    Signal<number>                                                                                                                            = isPlatformBrowser(inject<object>(PLATFORM_ID)) ? toSignal<number>(
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
  public readonly adjustTextAreaRows: (messageTextAreaElement: HTMLTextAreaElement, options: { fontSize?: number, lineHeight?: number, min?: number, max?: number, }) => void   = (textAreaElement: HTMLTextAreaElement, options: { fontSize?: number, lineHeight?: number, min?: number, max?: number, }): void => {
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
  public readonly getTextAreaRows:    (messageTextAreaElement: HTMLTextAreaElement, options: { fontSize?: number, lineHeight?: number, min?: number, max?: number, }) => number = (textAreaElement: HTMLTextAreaElement, options: { fontSize?: number, lineHeight?: number, min?: number, max?: number, }): number => Math
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
