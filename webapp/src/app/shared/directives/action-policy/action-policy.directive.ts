import { Directive, Input, ElementRef, OnInit, Injector } from '@angular/core';
/**
 * Directive that hides somes actions if the provided rules are evaluated to `true`.
 * It is mainly used in the `actions` button components configured the screens generated by `UI Studio` tool.
 *
 * This class should not be modified.
 */
@Directive({
  selector: '[plmActionPolicy]',
})
export class ActionPolicyDirective implements OnInit {
  @Input('plmActionPolicy') policyConfig: string;

  service: any;

  constructor(private elementRef: ElementRef, private injector: Injector) { }

  ngOnInit() {
    let featureName, useCaseName, actionName;
    [featureName, useCaseName, actionName] = this.policyConfig.split(',');
    try {
      if (featureName && useCaseName && actionName) {
        this.service = this.injector.get(`${featureName}PolicyService`);
        if (this.service.isComponentRestricted(useCaseName, actionName)) {
          this.hideAction();
        }
      }
    } catch (error) {
      // no policy service is provided for this feature
    }
  }

  /**
   * hide action when user is not allowed
   */
  hideAction() {
    this.elementRef.nativeElement.style.display = 'none';
  }
}
