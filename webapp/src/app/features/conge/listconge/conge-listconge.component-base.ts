import { Component, OnInit, inject } from '@angular/core'
import { Observable, from, of, zip } from 'rxjs'
import { map, reduce, tap, switchMap, filter, takeUntil } from 'rxjs/operators'
import { ActivatedRoute, Router } from '@angular/router'
import { MenuItem, ConfirmationService, LazyLoadEvent } from 'primeng/api'
import { Store } from '@ngrx/store'
import { get, isEmpty } from 'lodash'

import { getValue, getParamValue } from '@app/shared/utils/feature-utils'
import * as fn from '@app/shared/utils/expression-functions'
import { CollectionScreenComponent } from '@core/features/collection-screen.component'
import * as fromStore from '@app/core/store'
import {
  Column,
  ColumnGroup,
  ResponsiveResolution,
} from '@core/utils/collection.util'
import { FeatureService } from '@services/feature/feature.service'
import { CriteriaService } from '@app/core/services/criteria/criteria.service'
import * as fromConge from '@features/conge/listconge/store'

import { environment } from '@env/environment'
/**
 * The base REST API path
 */
const BASE_PATH = environment.basePath
/**
 * The feature module's name
 */
const FEATURE = 'Conge'
/**
 * The component's name
 */
const SCREEN = 'Listconge'
/**
 * This base component displays a collection of items.
 * This component is auto generated by `UI Studio` tool for a screen of type `EditCollection`, please refer to our official documentation for more informations:
 * https://wiki.vermeg.com/pages/viewpage.action?spaceKey=PFD&title=Components+Store#ComponentsStore-Searchscreen
 *
 * You can override, if needed, all the generated methods & variables of the Base component in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 **/
@Component({ template: '' })
export class CongeListcongeBaseComponent
  extends CollectionScreenComponent
  implements OnInit
{
  /**
   * Injected Services
   **/

  criteriaService = inject(CriteriaService)
  confirmationService = inject(ConfirmationService)
  featureService = inject(FeatureService)
  /**
   * The stored variables in NGRX State like `page`, `pageSize`, `keys`...etc
   */
  vars: any = {}
  /**
   * The selector of the `loading` state property, it displays a mask when receiving a `true` boolean value
   */
  loading$: Observable<boolean>
  /**
   * The Observable selector of the value property stored in NGRX State
   */
  value$: Observable<any[]>
  /**
   * The collection of data items loaded
   */
  value: any[]
  /**
   * The selected rows selector
   */
  rowsSelected$: Observable<any[]>
  /**
   * Switch Mode to be set in local storage
   */
  prefix
  /**
   * The technical keys of the configured columns
   */
  keys = `dateDepart,dateFin,statut`
  /**
   * The Observable selector of the current page property stored in NGRX State
   */
  currentPage$
  /**
   * The Observable selector of the page size property stored in NGRX State
   */
  pageSize$
  /**
   * The Observable selector of the total items number property stored in NGRX State
   */
  count$
  /**
   * The string criteria of the input filters
   */
  criteria

  /**
   * The current page's index
   */
  currentPage = 0
  /**
   * disable tooltip on cell hover when content is not truncated
   */
  disableTooltip = true

  /**
   *  The size of items per page
   **/
  pageSize = 10
  /**
   *  The collection of items
   **/
  items: any[]
  /**
   *  The collection of the selected items
   **/
  selectedItems: any[] = []

  rowOperations$: Observable<MenuItem[]>

  columnHeaderi18n: any = {
    dateDepart: $localize`:@@UID__fld_dateDepart;conge;listconge:Date Depart`,

    dateFin: $localize`:@@UID__fld_dateFin;conge;listconge:Date Fin`,

    statut: $localize`:@@UID__fld_statut;conge;listconge:Statut`,

    column34205: $localize`:@@UID__fld_column34205;conge;listconge:Column3`,
  }

  /** @inheritDoc */
  constructor(
    router: Router,
    store: Store<fromConge.State>,
    route: ActivatedRoute
  ) {
    super(route, store, router)
  }
  /**
   * Initializes the state and value of the component by dispatching NGRX Actions
   * Selects and listens to the changes of some properties stored in the state
   */
  ngOnInit() {
    super.ngOnInit()
    this.ctx = fromStore.initScreen(
      FEATURE,
      SCREEN,
      this.screenId,
      this.activeRoute
    )
    this.criteria = this.getCriteria()
    this.params = { ...this.params, ...this.initParams() }

    this.store.dispatch(fromConge.initAction({ ...this.params }))
    this.init()

    this.value$ = this.store.select(fromStore.selectValue, this.ctx).pipe(
      fromStore.distinctUntilBeChanged,
      tap((items) => {
        this.value = items
      })
    )

    this.loading$ = this.store.select(fromStore.selectLoading, this.ctx)
    this.prefix = `${environment.prefix}_conge_listconge`
    this.count$ = this.store.select(fromStore.selectCount, this.ctx)
    this.store
      .select(fromStore.selectSearchVars, this.ctx)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.vars = { ...data }
      })
    this.rowsSelected$ = this.store.select(
      fromStore.selectRowsSelected,
      this.ctx
    )
  }
  /**
   * Dispatch the search Action
   */
  init() {
    this.store.dispatch(fromConge.searchAction({ ...this.params }))
    this.currentPage$ = this.store.select(fromStore.selectPage, this.ctx)
    this.pageSize$ = this.store.select(fromStore.selectPageSize, this.ctx)
  }
  /**
   * This method returns the feature & screen name
   * @return {object}
   */
  getDescriptor() {
    return { feature: FEATURE, screen: SCREEN }
  }
  /**
   * Returns a decoded criteria parameter
   */
  getCriteria() {
    let criteria = this.activeRoute.snapshot.queryParams.criteria
    return criteria
  }
  /**
   * Returns the basic payload value
   */
  initParams(): any {
    return {
      totalItems: this.totalItems,
      page: 1,
      size: this.pageSize,
      keys: this.keys,
      order: this.orderBy,
      criteria: this.criteria,
      vars: {
        page: 1,
        size: this.pageSize,
        keys: this.keys,
        criteria: this.criteria,
        order: this.orderBy,
      },
    }
  }

  /**
   * Get date format from the profile
   * @param {string} temporalType
   * @param {string} datePrecision
   * @return {string} the date format
   */
  getDateFormat(temporalType: string, datePrecision?: string): string {
    return this.featureService.profileService.getDateFormat(
      temporalType,
      datePrecision
    )
  }

  /**
   * Paginates the retrieved data
   * @param {PageChange} event - The PageChange event
   */
  paginate(event) {
    this.store.dispatch(
      fromConge.searchAction({
        ...this.params,
        loading: true,
        size: event.rows,
        page: event.page + 1,
        vars: { ...this.vars, size: event.rows, page: event.page + 1 },
      })
    )
  }

  /**
   * display tooltip with cell content when content is truncated
   */
  addTooltip(show) {
    this.disableTooltip = show
  }

  /**
   * Returns the payload value to be dispatched in the NGRX actions
   * @returns {object}
   */
  getActionPayload() {
    return {
      ...super.getActionPayload(),
      vars: { ...this.vars, items: this.value },
      data:
        this.selectedItems instanceof Array
          ? this.selectedItems[0]
          : this.selectedItems,
      rowId: this.selectedItems ? this.selectedItems['code'] : undefined,
      value: this.value,
    }
  }
  /**
   * Dispatches an NGRX Action to select rows
   */
  onSelectionChange() {
    this.store.dispatch(
      fromConge.rowsSelectionChangeAction({
        ...this.params,
        rowsSelected: [this.selectedItems],
      })
    )
  }
  /**
   * Executes the edit action
   * @return {void}
   */

  doEdit(rowData): void {
    this.selectedItems = [rowData]
    const payload = { ...this.getActionPayload(), data: rowData }
    this.store.dispatch(fromConge.editAction(payload))
  }
  /**
   * Executes the Button-66719 action
   * @return {void}
   */
  doButton66719(rowData): void {
    this.selectedItems = [rowData]
    const payload = { ...this.getActionPayload(), data: rowData }
    this.store.dispatch(fromConge.button66719Action(payload))
  }

  /***
   * Executes the Button-57632 action
   * @return {void}
   **/
  doButton57632(rowData): void {
    this.confirmationService.confirm({
      header: $localize`:message;confirmationMsg:Confirmation`,
      message: $localize`:message;deleteItem:Are you sure?`,
      accept: () => {
        const payload = {
          ...this.getActionPayload(),
          rowId: rowData.code,
          data: rowData,
        }
        this.store.dispatch(
          fromConge.button57632Action({
            ...payload,
            targetCtx: { ...this.ctx },
          })
        )
      },
      key: 'congelistconge',
    })
  }

  /**
   * Executes the Button-26614 action
   * @return {void}
   */
  doButton26614(): void {
    this.store.dispatch(
      fromConge.button26614Action({ ...this.getActionPayload() })
    )
  }
}
