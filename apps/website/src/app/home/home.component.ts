import { BreakpointObserver, BreakpointState }                                                                               from "@angular/cdk/layout";
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { doc, DocumentSnapshot, Firestore, onSnapshot }                                                                      from "@angular/fire/firestore";
import { FormBuilder, FormGroup }                                                                                            from "@angular/forms";
import { map, Observable }                                                                                                   from "rxjs";
import { AuthenticationService }                                                                                             from "../authentication.service";


@Component({
  selector: 'websiteApp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {

  private readonly unsubscribeShortcutsAPIPublicDocumentOnSnapshot;

  @ViewChild("messageInput")
  private readonly messageInputElement?: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,

    Firestore: Firestore,
    ChangeDetectorRef: ChangeDetectorRef,
    FormBuilder: FormBuilder,
    BreakpointObserver: BreakpointObserver,
  ) {
    this
      .focus = "";
    this
      .unsubscribeShortcutsAPIPublicDocumentOnSnapshot = onSnapshot(doc(Firestore, "_/ZdrDhz5fPVSfBjOnAqwi"), {
        next: (documentSnapshot: DocumentSnapshot): void => {
          this
            .focus = documentSnapshot.data()?.["focus"];

          ChangeDetectorRef
            .detectChanges();
        },
      });

    this
      .messageForm = FormBuilder
      .group({
        message: [""],
      })

    this
      .messageInputRows = 1;
    this
      .adjustMessageInputRows = (): void => this
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

    this
      .getBreakpointObservable = (breakpoint: number): Observable<boolean> => BreakpointObserver
      .observe("(max-width: " + breakpoint + "rem)")
      .pipe(
        map((breakpointState: BreakpointState): boolean => breakpointState.matches)
      );

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
  };

  public focus: string;

  public readonly messageForm: FormGroup;

  public messageInputRows: number;
  public readonly adjustMessageInputRows: () => void;

  public readonly getBreakpointObservable: (breakpoint: number) => Observable<boolean>;

  public readonly backgroundAppearanceObservable: Observable<"light" | "dark">;
  public readonly foregroundAppearanceObservable: Observable<"dark" | "light">;

  ngOnInit(): void {
    this
      .authenticationService
      .register();
  }

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
