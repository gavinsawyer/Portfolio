import { BreakpointObserver, BreakpointState }             from "@angular/cdk/layout";
import { DOCUMENT, isPlatformBrowser }                     from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { toSignal }                                        from "@angular/core/rxjs-interop";
import { fromEvent, map, startWith }                       from "rxjs";


type ColorScheme = "light" | "dark";

@Injectable({
  providedIn: "root",
})
export class ResponsivityService {

  public readonly scrollPosition: Signal<number>;
  public readonly backgroundAppearance: Signal<ColorScheme>;
  public readonly foregroundAppearance: Signal<ColorScheme>;
  public readonly adjustTextAreaRows: (messageTextAreaElement: HTMLTextAreaElement, options: {
    fontSize?: number,
    lineHeight?: number,
    min?: number,
    max?: number,
  }) => void;
  public readonly getTextAreaRows: (messageTextAreaElement: HTMLTextAreaElement, options: {
    fontSize?: number,
    lineHeight?: number,
    min?: number,
    max?: number,
  }) => number;

  constructor(
    @Inject(DOCUMENT)    document: Document,
    @Inject(PLATFORM_ID) platformId: object,

    breakpointObserver: BreakpointObserver,
  ) {
    this
      .adjustTextAreaRows = (textAreaElement: HTMLTextAreaElement, options: {
        fontSize?: number,
        lineHeight?: number,
        min?: number,
        max?: number,
      }): void => {
        textAreaElement
          .style
          .height = "0";

        textAreaElement
          .rows = this
          .getTextAreaRows(textAreaElement, options);

        textAreaElement
          .style
          .height = "auto";
      };
    this
      .backgroundAppearance = isPlatformBrowser(platformId) ? toSignal<ColorScheme>(
        breakpointObserver.observe("(prefers-color-scheme: light)").pipe<ColorScheme>(
          map<BreakpointState, ColorScheme>(
            (breakpointState: BreakpointState): ColorScheme => breakpointState.matches ? "light" : "dark",
          ),
        ),
        {
          requireSync: true,
        },
      ) : signal<ColorScheme>("light");
    this
      .foregroundAppearance = isPlatformBrowser(platformId) ? toSignal<ColorScheme>(
        breakpointObserver.observe("(prefers-color-scheme: light)").pipe<ColorScheme>(
          map<BreakpointState, ColorScheme>(
            (breakpointState: BreakpointState): ColorScheme => breakpointState.matches ? "dark" : "light",
          ),
        ),
        {
          requireSync: true,
        },
      ) : signal<ColorScheme>("dark");
    this
      .getTextAreaRows = (textAreaElement: HTMLTextAreaElement, options: {
        fontSize?: number,
        lineHeight?: number,
        min?: number,
        max?: number,
      }): number => Math
      .min(
        Math.max(
          Math.round(
            textAreaElement.scrollHeight / ((options.lineHeight || 1.15) * (options.fontSize || 1) * 16),
          ),
          options.min || 1,
        ),
        options.max || 256,
      );
    this
      .scrollPosition = isPlatformBrowser(platformId) ? toSignal<number>(
        fromEvent<Event>(document, "scroll").pipe<number, number>(
          map<Event, number>(
            (): number => document.defaultView?.scrollY || 0,
          ),
          startWith<number>(document.defaultView?.scrollY || 0),
        ),
        {
        requireSync: true,
      }
      ) : signal<number>(0);
  }

}
