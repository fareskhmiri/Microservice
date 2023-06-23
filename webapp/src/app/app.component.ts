import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core'
import {
  Router,
  NavigationStart,
  NavigationCancel,
  NavigationEnd,
} from '@angular/router'
import { Subject, Observable } from 'rxjs'
import { takeUntil, filter } from 'rxjs/operators'

import { TranslatorService } from './core/services/translator/translator.service'
import { AuthManagerService } from '@services/auth/auth-manager.service'
/**
 * The main entry point component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  /**
   * The component's state property (loaded or not yet)
   */
  loaded = false
  /**
   * The show loading option
   */
  showLoading: boolean
  /**
   * The Subjet emitter object to destroy all the subscriptions
   * when the component is destroyed
   */
  destroy$: Subject<boolean> = new Subject<boolean>()
  /**
   * The Subjet initializer emitter object
   */
  private initialized$: Observable<boolean>

  constructor(
    private router: Router,
    private translator: TranslatorService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthManagerService
  ) {}

  /**
   * Initializes the state and value of the component
   */
  ngOnInit() {
    this.translator.initLanguage()
    this.showLoading = true
    this.loaded = true
  }
  /**
   * Subscribes to the events stream in order to display a loader when a request is sent
   */
  ngAfterViewInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showLoading = true
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.showLoading = false
      }
      this.cdRef.detectChanges()
    })
  }
  /**
   * Destroys the component and all the subscriptions
   */
  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }
}
