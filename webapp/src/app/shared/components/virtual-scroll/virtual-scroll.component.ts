import { Component, Input, EventEmitter, Output, OnInit, TemplateRef, ContentChild } from '@angular/core'

import * as virtualScrollUtils from './virtual-scroll-service'

import { LazyLoadEvent } from 'primeng/api'
import { Observable } from 'rxjs';

/**
 * This Generic Component displays a chart from chart.js library
 * It takes as input some properties and data to display
 */
@Component({
  selector: 'vp-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
})
export class VirtualScrollComponent implements OnInit {
  @ContentChild('itemTemplate', { read: TemplateRef, static: false }) itemTemplate: TemplateRef<any>;

  /**
   *The height of the viewport
   */
  scrollSize: any

  /**
  *The number of rows per page
  */
  rowsNumber: number

  /***
   * The height of the card to display
   */
  @Input() itemHeight: number

  /***
   * The value of the table
   */
  @Input() valueObservable: Observable<any>

  /**
   * Card breakpoints
   */
  @Input() rowCols: string;

  /**
   * Number of items to be displayed per page 
   */
  @Input() pageSizeVs: number;

  /**
   * Event to be emitted when scrolling
   */
  @Output() loadPage = new EventEmitter();


  constructor() { }

  ngOnInit() {
    this.scrollSize = virtualScrollUtils.getScrollHeight(this.rowCols, this.itemHeight,this.pageSizeVs)+'px';
    this.rowsNumber = virtualScrollUtils.getNumberOfCardsPerRow(this.rowCols);
  }
  loadPageEvent(event: LazyLoadEvent) {
    this.loadPage.emit(event);
  }
}
