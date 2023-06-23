import { Pipe, PipeTransform } from "@angular/core";
import { CurrencyPipe } from "@angular/common";

import { ProfileService } from "@services/profile/profile.service";
import { transformToNumber } from "@shared/utils/format-number";
/**
 * Pipe that formats the Currency values. It is mainly used in the `currency` component supported by ÙI Studio`tool.
 *
 * This class should not be modified.
 */
@Pipe({
  name: "currencyPipe"
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(
    private currencyPipe: CurrencyPipe,
    private profile: ProfileService
  ) {}
  /**
   * Formats the provided value using the user's profile
   * @param value
   * @param currencyCode
   * @param currencyDecimal
   */
  transform(
    value: any,
    currencyCode?: string,
    currencyDecimal?: string,
    display?: string
  ): string {
    const numberValue = transformToNumber(value, this.profile.getGroupingSymbol(), this.profile.getDecimalSymbol());
    return this.currencyPipe.transform(
      numberValue,
      currencyCode ?? "",
      display ? display: currencyCode !== undefined ? "" : "symbol",
      this.profile.getDigitsInfo(currencyDecimal),
      this.profile.getLocale()
    );
  }
}
