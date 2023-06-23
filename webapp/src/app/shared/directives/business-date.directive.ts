import { Directive, Optional, Self, Host, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import * as moment from 'moment';

@Directive({
  selector: '[businessDate]'
})
export class BusinessDateDirective implements AfterViewInit {
  @Output() businessDate = new EventEmitter<any>();

  constructor(@Host() @Self() @Optional() public host: Calendar) {

    // the original primeng UpdateModel function
    const oldUpdateModel = host.updateModel;
    /**
     * Define a function to transform a value to UTC time
     * @param value
     * @returns
     */
    const transformValue = (value: any): any => {
      // In case of fromToDate component transform each element of the array to UTC time
      if (value instanceof Array) {
        return value.map(el => transformDate(el));
      } else {
        return transformDate(value);
      }
    }

    const transformDate = (date: any): any => {
      if (!date) {
        return null;
      }
      const isUtcNegative = moment(date).utcOffset() < 0;
      const utcMomentDate = isUtcNegative ? moment(date).utcOffset(0, false) : moment(date).utcOffset(0, true);
      return utcMomentDate.toDate();
    }
    //override update model function
    host.updateModel = function (value) {
      if (!value) {
        this.value = null;
      } else {
        this.value = transformValue(value);
      }
      oldUpdateModel.call(host, this.value);

    }.bind(host);

  }
  ngAfterViewInit(): void {
    this.host.value && this.host.updateModel(this.host.value)
  }

}
