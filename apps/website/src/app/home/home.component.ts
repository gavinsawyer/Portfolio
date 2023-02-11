import { BreakpointObserver, BreakpointState }                                                                       from "@angular/cdk/layout";
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import { doc, DocumentSnapshot, Firestore, onSnapshot }                                                              from "@angular/fire/firestore";
import { FormBuilder, FormGroup }                                                                                    from "@angular/forms";
import { map, Observable }                                                                                           from "rxjs";


@Component({
  selector: 'websiteApp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterContentInit, OnDestroy {

  @ViewChild("messageInput")
  private messageInputElement?: ElementRef;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private firestore: Firestore,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
  ) {};

  private readonly unsubscribeShortcutsAPIPublicDocumentOnSnapshot = onSnapshot(doc(this.firestore, "_/ZdrDhz5fPVSfBjOnAqwi"), {
    next: (documentSnapshot: DocumentSnapshot): void => {
      this
        .focus = documentSnapshot.data()?.["focus"];

      this
        .changeDetectorRef
        .detectChanges();
    },
  });

  public focus: string = "";

  public readonly messageForm: FormGroup = this
    .formBuilder
    .group({
      message: [""],
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
    })();

  public readonly getBreakpointObservable: (breakpoint: number) => Observable<boolean> = (breakpoint: number): Observable<boolean> => this
    .breakpointObserver
    .observe("(max-width: " + breakpoint + "rem)")
    .pipe(
      map((breakpointState: BreakpointState): boolean => breakpointState.matches)
    );

  public readonly backgroundAppearanceObservable: Observable<"light" | "dark"> = this
    .breakpointObserver
    .observe("(prefers-color-scheme: light)")
    .pipe(
      map((breakpointState: BreakpointState): "light" | "dark" => breakpointState.matches ? "light" : "dark")
    );

  public readonly foregroundAppearanceObservable: Observable<"dark" | "light"> = this
    .breakpointObserver
    .observe("(prefers-color-scheme: light)")
    .pipe(
      map((breakpointState: BreakpointState): "light" | "dark" => breakpointState.matches ? "dark" : "light")
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

  ngOnDestroy(): void {
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot();
  }
}
