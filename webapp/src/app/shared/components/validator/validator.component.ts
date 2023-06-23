import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
/**
 * Validator that validates a `FormControl` and diplays errors in case of failure.
 * It is mainly used in the `edit` and `searchInput` screens generated by UI Studio tool.
 *
 * This class should not be modified.
 */
@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html'
})
export class ValidatorComponent {
  /**
   * FormControl element
   */
  @Input() control: AbstractControl;
  /**
   * Warning or error messages
   */
  @Input() messages;
  /**
   * Returns the pattern of the current `formControl` like `Date` pattern
   */
  get pattern() {
    if (this.messages && this.messages.pattern) {
      return this.messages.pattern;
    } else {
      return $localize `:message;invalidPattern:The pattern is ${this.control.errors.pattern.requiredPattern}`;
    }
  }
  /**
   * Returns the rules to validate
   */
  get rules() {
    if (this.messages.rules) {
      return this.messages.rules;
    } else {
      return $localize `:message;invalidValue:The value is invalid`;
    }
  }
}
