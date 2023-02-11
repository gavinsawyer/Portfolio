import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { Injectable }                          from "@angular/core";
import { map, Observable }                     from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class ResponsivityService {

  constructor(
    BreakpointObserver: BreakpointObserver,
  ) {
    this
      .backgroundAppearanceObservable = BreakpointObserver
      .observe("(prefers-color-scheme: light)")
      .pipe(
        map((breakpointState: BreakpointState): "light" | "dark" => breakpointState.matches ? "light" : "dark")
      );
    this
      .foregroundAppearanceObservable = BreakpointObserver
      .observe("(prefers-color-scheme: light)")
      .pipe(
        map((breakpointState: BreakpointState): "light" | "dark" => breakpointState.matches ? "dark" : "light")
      );

    this
      .getBreakpointObservable = (breakpoint: number): Observable<boolean> => BreakpointObserver
      .observe("(max-width: " + breakpoint + "rem)")
      .pipe(
        map((breakpointState: BreakpointState): boolean => breakpointState.matches)
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
          .rows = Math.min(Math.max(Math.round(textAreaElement.scrollHeight / ((options.lineHeight || 1.15) * (options.fontSize || 1) * 16)), options.min || 1), options.max || 256);

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

  public readonly backgroundAppearanceObservable: Observable<"light" | "dark">;
  public readonly foregroundAppearanceObservable: Observable<"dark" | "light">;

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
