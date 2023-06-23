import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[summaryHeightCalculator]' })
export class SummaryHeightCalculatorDirective {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const summaryHeight = this.el.nativeElement.querySelector('.vp-wizard-summary')?.offsetHeight;
    const wizardContainer = this.el.nativeElement;
    if (summaryHeight && wizardContainer) {
      wizardContainer.style.marginTop = summaryHeight - 20 + 'px';
    }
  }
}
