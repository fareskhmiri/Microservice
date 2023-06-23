import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

import { NumberPipe } from '@shared/pipes/number.pipe';
import { ProfileService } from '@services/profile/profile.service';
import { transformToNumber } from '@shared/utils/format-number';
/**
 * Directive that formats number values `onFocus` and `onBlur` events.
 *
 * This class should not be modified.
 */
@Directive({ selector: '[plmNumberFormatter]' })
export class NumberFormatterDirective {
  /**
   * Native HTML element
   */
  private el: HTMLInputElement;

  constructor(
    private numberPipe: NumberPipe,
    private elementRef: ElementRef,
    private control: NgControl,
    private profile: ProfileService
  ) {
    this.el = this.elementRef.nativeElement;
  }
  /**
   * Focus event to execute
   * @param value
   */
  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    this.el.value = this.control.control.value;
  }
  /**
   * Blur event to execute
   * @param value
   */
  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this.applyNumberFormatting(value);
  }

  ngAfterViewInit() {
    let value = this.el.value;
    this.applyNumberFormatting(value);
  }

  private applyNumberFormatting(value: any) {
    const numberValue = transformToNumber(value, this.profile.getGroupingSymbol(), this.profile.getDecimalSymbol());
    this.control.control.setValue(numberValue);
    this.el.value = this.numberPipe.transform(value);
  }
}
