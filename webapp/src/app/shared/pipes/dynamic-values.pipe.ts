import { Pipe, PipeTransform } from '@angular/core';
import { TranslatorService } from '@app/core/services/translator/translator.service';

@Pipe({
  name: 'dynamicValuesPipe'
})
export class DynamicValuesPipe implements PipeTransform {
constructor(private translatorService: TranslatorService) {

}
  transform(value: string, key: string): string {
    let returnedValue = value;
     this.translatorService.getDynamicValues(value,key).subscribe(data=> {
      if (!data.includes('DynamicValues.')) {
        returnedValue= data;
      }
    })
  return returnedValue;

  }

}
