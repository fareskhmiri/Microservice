import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vpArrayformFilter'
})
export class ArrayFormFilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    return items.filter(item => item.value[field].toLowerCase().includes(value.toLowerCase()));
  }
}
