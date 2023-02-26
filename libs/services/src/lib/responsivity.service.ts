import { BreakpointObserver, BreakpointState }                                    from "@angular/cdk/layout";
import { DOCUMENT, isPlatformServer }                                             from "@angular/common";
import { Inject, Injectable, PLATFORM_ID }                                        from "@angular/core";
import { BehaviorSubject, filter, fromEvent, map, Observable, shareReplay, take } from "rxjs";


type Appearance = "light" | "dark"

@Injectable({
  providedIn: 'root',
})
export class ResponsivityService {

  constructor(
    @Inject(DOCUMENT)
    Document: Document,

    @Inject(PLATFORM_ID)
    platform_id: string,

    BreakpointObserver: BreakpointObserver,
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
      .backgroundAppearanceObservable = BreakpointObserver
      .observe("(prefers-color-scheme: light)")
      .pipe<BreakpointState, Appearance, Appearance>(
        shareReplay<BreakpointState>(),
        map<BreakpointState, Appearance>((breakpointState: BreakpointState): Appearance => breakpointState.matches ? "light" : "dark"),
        isPlatformServer(platform_id) ? take<Appearance>(1) : filter<Appearance>((): boolean => true)
      );
    this
      .foregroundAppearanceObservable = BreakpointObserver
      .observe("(prefers-color-scheme: light)")
      .pipe<BreakpointState, Appearance, Appearance>(
        shareReplay<BreakpointState>(),
        map<BreakpointState, Appearance>((breakpointState: BreakpointState): Appearance => breakpointState.matches ? "dark" : "light"),
        isPlatformServer(platform_id) ? take<Appearance>(1) : filter<Appearance>((): boolean => true)
      );
    this
      .getTextAreaRows = (textAreaElement: HTMLTextAreaElement, options: {
        fontSize?: number,
        lineHeight?: number,
        min?: number,
        max?: number,
      }): number => Math.min(Math.max(Math.round(textAreaElement.scrollHeight / ((options.lineHeight || 1.15) * (options.fontSize || 1) * 16)), options.min || 1), options.max || 256);
    this
      .scrollPositionObservable = (Document.defaultView ? fromEvent<Event>(Document.defaultView, "scroll").pipe<number>(
        map<Event, number>((): number => window.scrollY || 0)
      ) : (new BehaviorSubject<number>(0)).asObservable())
      .pipe<number, number>(
        shareReplay<number>(),
        isPlatformServer(platform_id) ? take<number>(1) : filter<number>((): boolean => true)
      );
  }

  public readonly scrollPositionObservable: Observable<number>;

  public readonly backgroundAppearanceObservable: Observable<Appearance>;
  public readonly foregroundAppearanceObservable: Observable<Appearance>;

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

}
