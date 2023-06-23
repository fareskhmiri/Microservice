import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { isDate } from "lodash";

import { ProfileService } from '@services/profile/profile.service';
import { NumberPipe } from '@shared/pipes/number.pipe';
/**
 * Pipe that formats the Column values. It is mainly used in the `Search` & `Edit Collection` & `Tree` screens generated by `UI Studio` tool.
 *
 * This class should not be modified.
 */
@Pipe({
  name: 'gridPipe'
})
export class GridPipe implements PipeTransform {
  /**
   * The current language
   */
  locale: string;

  constructor (
    private profile: ProfileService,
    private numberPipe: NumberPipe,
    private datePipe: DatePipe) {
  }
  /**
   * Formats the provided column's value
   * @param value
   * @param colType
   * @param temporalType
   * @param datePrecision
   */
  transform(value: any, colType: string, temporalType?: string, datePrecision?: string): string {
    if (value) {
      if (colType === 'date' && isDate(value)) {
        return this.datePipe.transform(value, this.profile.getDateFormat(temporalType, datePrecision));
      } else if (colType === 'number' || colType === 'integer') {
        return this.numberPipe.transform(value);
      } else {
        return value;
      }
    }
  }
}
