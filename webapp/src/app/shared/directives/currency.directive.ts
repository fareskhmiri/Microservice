import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  OnDestroy
} from "@angular/core";
import { NgControl } from "@angular/forms";

import { CustomCurrencyPipe } from "@shared/pipes/currency.pipe";
import { ProfileService } from "@services/profile/profile.service";
import { transformToNumber } from "@shared/utils/format-number";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
/**
 * Directive that formats the Currency values. It is mainly used in the `currency` component supported by ÙI Studio`tool.
 *
 * This class should not be modified.
 */
@Directive({ selector: "[plmCurrencyFormatter]" })
export class CurrencyFormatterDirective implements OnInit , OnDestroy {
  /**
   * Native HTML element
   */
  private el: HTMLInputElement;
  /**
   * The standard currency code
   */
  @Input() currencyCode: string;
  /**
   * The decimal digits number
   */
  @Input() currencyDecimal: string;
    /**
   * The currency display mode
   */
  @Input() display: string;
  /**
   * The value to format
   */
  @Input() value: any;
  /**
   * Has the focus if `true`
   */
  private hasFocus: boolean;
  private subscription: Subscription;

  constructor(
    private currencyPipe: CustomCurrencyPipe,
    private elementRef: ElementRef,
    private control: NgControl,
    private profile: ProfileService
  ) {
    this.el = this.elementRef.nativeElement;
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  ngOnInit() {
    if (this.control.control.value) {
      this.transform(this.control.control.value);
    }
    this.subscription = this.control.valueChanges.pipe(
      filter(value => !this.hasFocus || this.value !== value),
    )
      .subscribe(data => {
        this.transform(data)
      })
  }
  /**
   * Focus event to be executed
   * @param value
   */
  @HostListener("focus", ["$event.target.value"])
  onFocus(value) {
    this.hasFocus = true;
    this.el.value = this.control.control.value;
  }
  /**
   * Blur event to be executed
   * @param value
   */
  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.hasFocus = false;
    this.transform(value);
  }
  /**
   * Formats the given currency value as parameter
   * @param value
   */
  private transform(value) {
    if (value) {
      const numberValue = transformToNumber(value, this.profile.getGroupingSymbol(), this.profile.getDecimalSymbol());
      this.control.control.setValue(numberValue, { emitEvent: false });
      this.el.value = this.currencyPipe.transform(value, this.currencyCode, this.currencyDecimal,this.display);
    }
  }
}
