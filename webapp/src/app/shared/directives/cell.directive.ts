import { Directive, HostListener, ElementRef, EventEmitter, Output } from '@angular/core';
/**
 * Directive that displays a tooltip on truncated cell's content
 *
 * This class should not be modified.
 */
@Directive({ selector: '[plmTruncatedCell]' })

export class CellDirective {


  private e: HTMLInputElement;
  @Output() mouseOverCell  = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {
    this.e = this.elementRef.nativeElement;
  }

  @HostListener('mouseover', ['$event.target'])
  onMouseOver(td) {
    if (this.e.offsetWidth < this.e.scrollWidth) {
      this.mouseOverCell.emit(false)
    }
  }

  @HostListener('mouseout', ['$event.target'])
  onMouseOut(td) {
    if (this.e.offsetWidth < this.e.scrollWidth) {
      this.mouseOverCell.emit(true)
    }
  }
}
