import { Input, TemplateRef, Directive } from '@angular/core'
/**
 * Directive used to access content children.
 *
 * This class should not be modified.
 */
@Directive({
    selector: '[plmTemplate]',
})
export class PalmyraTemplateDirective {
    /**
     * Template's type
     */
    @Input() type: string
    /**
     * Template's name
     */
    @Input() plmTemplate: string

    constructor(public template: TemplateRef<any>) {}

    /**
     * Returns the template's type
     *
     */
    getType(): string {
        return this.plmTemplate
    }
}
