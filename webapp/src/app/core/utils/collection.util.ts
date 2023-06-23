/**
 * The column interface's properties
 */
export interface Column {
  /**
   * The column's width
   */
  width?: string;
  /**
   * The column's name
   */
  name: string;
  /**
   * The technical related field(s)
   */
  field: string | String[];
  /**
   * Option to froze the column of `true`
   */
  frozen?: boolean;
  /**
   * The responsive styleName
   */
  resolutionClass?: ResponsiveResolution;
  /**
   * The column's type
   */
  type?: string;
  /**
   * Used with Data component
   */
  temporalType?: string;
  /**
   * Used with Data component
   */
  datePrecision?: string;
  /**
   * A grouped column if `true`
   */
  isGrouped?: boolean;
}
/**
 * The supported web responsive breakpoints
 */
export enum ResponsiveResolution {
  L = 'ui-l',
  M = 'ui-m',
  SM = 'ui-s',
  XS = 'ui-xs',
}
/**
 * The grouped column interface's properties
 */
export interface ColumnGroup {
  /**
   * The column name
   */
  label: string;
  /**
   * Defines the number of columns a cell should span
   */
  colSpan: number;
  /**
   * Defines the number of rows a row should span
   */
  rowSpan: number;
}
/**
 * Gets the number of pages
 * @param totalItems
 * @param itemsByPage
 */
export function getNumberOfPages(totalItems: number, itemsByPage): number {
  if (totalItems <= itemsByPage) {
    return 1;
  } else {
    return Math.ceil(totalItems / itemsByPage);
  }
}
/**
 * Gets the page to load
 */
export function getTargetPage(index, pageSize, currentPage) {
  let page = index === 0 ? 1 : (index+pageSize) / pageSize;
  if(index > 0) {
    if(Math.round(page) === currentPage) {
      page = Math.round(page -1);
    } else {
      page = Math.round(page) < currentPage ? Math.round(page) : Math.round(page);
    }
  }
  return page;
}