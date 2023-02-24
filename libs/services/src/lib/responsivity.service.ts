import { BreakpointObserver, BreakpointState }         from "@angular/cdk/layout";
import { DOCUMENT }                                    from "@angular/common";
import { Inject, Injectable }                          from "@angular/core";
import { BehaviorSubject, fromEvent, map, Observable } from "rxjs";


type Appearance = "light" | "dark"

@Injectable({
  providedIn: 'root',
})
export class ResponsivityService {

  constructor(
    @Inject(DOCUMENT)
    Document: Document,

    BreakpointObserver: BreakpointObserver,
  ) {
    this
      .scrollPositionObservable = Document.defaultView ? fromEvent(Document.defaultView, "scroll")
      .pipe(
        map((): number => window.scrollY)
      ) : (new BehaviorSubject(0)).asObservable();

    this
      .backgroundAppearanceObservable = BreakpointObserver
      .observe("(prefers-color-scheme: light)")
      .pipe<Appearance>(
        map<BreakpointState, Appearance>((breakpointState: BreakpointState): Appearance => breakpointState.matches ? "light" : "dark")
      );
    this
      .foregroundAppearanceObservable = BreakpointObserver
      .observe("(prefers-color-scheme: light)")
      .pipe<Appearance>(
        map<BreakpointState, Appearance>((breakpointState: BreakpointState): Appearance => breakpointState.matches ? "dark" : "light")
      );

    this
      .getBreakpointObservable = (breakpoint: number): Observable<boolean> => BreakpointObserver
      .observe("(max-width: " + breakpoint + "rem)")
      .pipe<boolean>(
        map<BreakpointState, boolean>((breakpointState: BreakpointState): boolean => breakpointState.matches)
      );

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
      .getTextAreaRows = (textAreaElement: HTMLTextAreaElement, options: {
        fontSize?: number,
        lineHeight?: number,
        min?: number,
        max?: number,
      }): number => Math.min(Math.max(Math.round(textAreaElement.scrollHeight / ((options.lineHeight || 1.15) * (options.fontSize || 1) * 16)), options.min || 1), options.max || 256);
  }

  public readonly scrollPositionObservable: Observable<number>;

  public readonly backgroundAppearanceObservable: Observable<Appearance>;
  public readonly foregroundAppearanceObservable: Observable<Appearance>;

  public readonly getBreakpointObservable: (breakpoint: number) => Observable<boolean>;

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
