import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { Column, getNumberOfPages } from '@core/utils/collection.util';
import { ScreenComponent } from './screen.component';
/**
 * The base class for collections screens such as: `Search`, `edit-collection` and `tree`:
 * https://wiki.vermeg.com/display/PFD/Components+Store#ComponentsStore-Screens
 *
 * This class should not be modified.
 */
export class CollectionScreenComponent extends ScreenComponent {
  /**
   * The actions buttons to display when selecting a row
   */
  actionsButton;
  /**
   * The row's identifier
   */
  selectedCode: string;
  /**
   * The selected rows
   */
  selectedItems;
  /**
   * The single row actions
   */
  rowOperations;
  /**
   * The multi row actions
   */
  contextualRowOperations;
  /**
   * The collection data items
   */
  items = [];
  /**
   * The selected columns
   */
  selectedColumns: Column[];
  /**
   * The configured columns rendered in the Grid
   */
  columns: Column[];
  /**
   * The orderBy field
   */
  orderBy = '';
  /**
   * The configured keys configured in the columns
   */
  keys: string;
  /**
   * The total number of the data collection
   */
  totalItems = 0;
  /**
   * The current index of the displayed page
   */
  currentPageIndex = 1;
  /**
   * The loader mask property
   */
  loading = false;
  /**
   * The items size per page
   */
  pageSize: number;

  constructor(
    protected activeRoute: ActivatedRoute,
    protected store: Store<any>,
    protected router: Router
  ) {
    super(activeRoute, store, router);
  }
  /**
   * Event to check or uncheck the current page's rows
   * @param event
   */
  onHeaderCheckboxToggle(event) {
    if (event.checked) {
      this.onRowSelect(event);
    } else {
      this.onRowUnselect();
    }
  }
  /**
   * Event to fire the selection of a row
   * @param event
   */
  onContextMenuSelect(event) {
    this.onRowSelect(event);
  }
  /**
   * Event to select a row by displaying the available actions
   * @param event
   */
  onRowSelect(event) {
    if (this.selectedItems != null && this.selectedItems.length > 1) {
      this.actionsButton = this.contextualRowOperations;
    } else {
      this.actionsButton = this.rowOperations;
      if (Array.isArray(this.selectedItems)) {
        this.selectedCode = this.selectedItems[0]['code'];
      } else {
        this.selectedCode = this.selectedItems['code'];
      }
    }
  }
  /**
   * Event to unselect a row
   */
  onRowUnselect() {
    if (this.selectedItems != null && this.selectedItems.length > 1) {
      this.actionsButton = this.contextualRowOperations;
    } else if (this.selectedItems != null && this.selectedItems.length === 1) {
      this.actionsButton = this.rowOperations;
      this.selectedCode = null;
    } else {
      this.actionsButton = [];
    }
  }
  /**
   * Gets the number of the pages
   * @param totalItems
   * @param itemsByPage
   * @returns {number}
   */
  getNumberOfPage(totalItems: number, itemsByPage: number):number {
    return getNumberOfPages(totalItems, itemsByPage);
  }
}
