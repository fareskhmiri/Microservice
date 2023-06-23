import { Profile } from '@app/core/services/profile/profile.model';
import { isEmpty } from 'lodash';

/**
 * Get the real value of a formatted number
 * @param value
 * @returns {string}
 */
export function transformToNumber(value: number | string, groupingSymbol: string, decimalSymbol: string, chars?: string): any {
  if (typeof value === 'string' && !isEmpty(value)) {
    value = value.replace(/[\u202F\u00A0&\/\\#+()$~%'":*?<>{}]/g, '');
    value = value.replace(new RegExp(`\\${groupingSymbol}`, 'g'), '');
    value = value.replace(new RegExp(`\\${decimalSymbol}`, 'g'), '.');
    if ((value.match(/[.]/g) || []).length > 1) {
      value = value.replace(/[.]/g, '');
    }
    value = parseFloat(value);
  }
  return value;
}
