import { BreakpointObserver, BreakpointState }                from "@angular/cdk/layout";
import { AfterContentInit, Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup }                             from "@angular/forms";
import { map, Observable }                                    from "rxjs";


@Component({
  selector: 'websiteApp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements AfterContentInit {
  @ViewChild("messageInput")
  private messageInputElement?: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {}

  public readonly messageForm: FormGroup = this
    .formBuilder
    .group({
      message: [""]
    });

  public messageInputRows: number = 1;
  public adjustMessageInputRows: () => void = (): void => this
    .messageInputElement
    ?.nativeElement && ((): void => {
      this
        .messageInputElement
        .nativeElement
        .style
        .height = 0;

      this
        .messageInputRows = Math
        .round(this.messageInputElement.nativeElement.scrollHeight / (1.15*16) - 1);

      this
        .messageInputElement
        .nativeElement
        .style
        .height = "auto";
    })()

  public readonly focus: string = "Developing";

  public readonly backgroundAppearanceObservable: Observable<"light" | "dark"> = this
    .breakpointObserver
    .observe("(prefers-color-scheme: light)")
    .pipe(
      map((breakpointState: BreakpointState) => breakpointState.matches ? "light" : "dark")
    );

  public readonly foregroundAppearanceObservable: Observable<"dark" | "light"> = this
    .breakpointObserver
    .observe("(prefers-color-scheme: light)")
    .pipe(
      map((breakpointState: BreakpointState) => breakpointState.matches ? "dark" : "light")
    );

  ngAfterContentInit(): void {
    this
      .messageInputRows = Math
      .round(this.messageInputElement?.nativeElement.scrollHeight / (1.15*16) - 1);
    this
      .messageInputElement
      ?.nativeElement
      .focus();
  }
}
