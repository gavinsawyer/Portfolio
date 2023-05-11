import { BreakpointObserver, BreakpointState }             from "@angular/cdk/layout";
import { DOCUMENT, isPlatformBrowser }                     from "@angular/common";
import { Inject, Injectable, PLATFORM_ID, signal, Signal } from "@angular/core";
import { takeUntilDestroyed, toSignal }                    from "@angular/core/rxjs-interop";
import { fromEvent, map, startWith }                       from "rxjs";


type Appearance = "light" | "dark";

@Injectable({
  providedIn: "root",
})
export class HyperResponsivityService {

  public readonly scrollPosition: Signal<number>;
  public readonly backgroundAppearance: Signal<Appearance>;
  public readonly foregroundAppearance: Signal<Appearance>;
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
    @Inject(DOCUMENT)
    private readonly document: Document,

    @Inject(PLATFORM_ID)
    private readonly platformId: object,

    private readonly breakpointObserver: BreakpointObserver,
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
      .backgroundAppearance = toSignal<Appearance>(breakpointObserver.observe("(prefers-color-scheme: light)").pipe<Appearance, Appearance>(
        map<BreakpointState, Appearance>((breakpointState: BreakpointState): Appearance => isPlatformBrowser(platformId) ? (breakpointState.matches ? "light" : "dark") : "light"),
        takeUntilDestroyed<Appearance>(),
      ), {
        requireSync: true,
      });
    this
      .foregroundAppearance = toSignal<Appearance>(breakpointObserver.observe("(prefers-color-scheme: light)").pipe<Appearance, Appearance>(
        map<BreakpointState, Appearance>((breakpointState: BreakpointState): Appearance => isPlatformBrowser(platformId) ? (breakpointState.matches ? "dark" : "light") : "dark"),
        takeUntilDestroyed<Appearance>(),
      ), {
        requireSync: true,
      });
    this
      .getTextAreaRows = (textAreaElement: HTMLTextAreaElement, options: {
        fontSize?: number,
        lineHeight?: number,
        min?: number,
        max?: number,
      }): number => Math.min(Math.max(Math.round(textAreaElement.scrollHeight / ((options.lineHeight || 1.15) * (options.fontSize || 1) * 16)), options.min || 1), options.max || 256);
    this
      .scrollPosition = document
      .defaultView ? ((defaultView: Window & typeof globalThis): Signal<number> => toSignal<number>(fromEvent<Event>(document.defaultView, "scroll").pipe<number, number, number>(
        map<Event, number>((): number => defaultView.scrollY || 0),
        startWith<number>(0),
        takeUntilDestroyed<number>(),
      ), {
        requireSync: true,
      }))(document.defaultView) : signal<number>(0);
  }

}
