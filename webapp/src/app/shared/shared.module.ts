import { NgModule } from '@angular/core'
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  CurrencyPipe,
} from '@angular/common'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { DragDropModule } from '@angular/cdk/drag-drop'

// palmyra-needle-angular-library-import Palmyra will add import angular library module here
import { AccordionModule } from 'primeng/accordion'
import { CardModule } from 'primeng/card'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { ContextMenuModule } from 'primeng/contextmenu'
import { PanelMenuModule } from 'primeng/panelmenu'
import { MenubarModule } from 'primeng/menubar'
import { MessageModule } from 'primeng/message'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { SplitButtonModule } from 'primeng/splitbutton'
import { InputSwitchModule } from 'primeng/inputswitch'
import { SelectButtonModule } from 'primeng/selectbutton'
import { SidebarModule } from 'primeng/sidebar'
import { FieldsetModule } from 'primeng/fieldset'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { MultiSelectModule } from 'primeng/multiselect'
import { PaginatorModule } from 'primeng/paginator'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { TabViewModule } from 'primeng/tabview'
import { PanelModule } from 'primeng/panel'
import { ToggleButtonModule } from 'primeng/togglebutton'
import { FileUploadModule } from 'primeng/fileupload'
import { PasswordModule } from 'primeng/password'
import { SliderModule } from 'primeng/slider'
import { InputTextModule } from 'primeng/inputtext'
import { InputMaskModule } from 'primeng/inputmask'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { KeyFilterModule } from 'primeng/keyfilter'
import { CheckboxModule } from 'primeng/checkbox'
import { RadioButtonModule } from 'primeng/radiobutton'
import { TableModule } from 'primeng/table'
import { ChartModule } from 'primeng/chart'
import { TooltipModule } from 'primeng/tooltip'
import { DataViewModule } from 'primeng/dataview'
import { SlideMenuModule } from 'primeng/slidemenu'
import { ToastModule } from 'primeng/toast'
import { TreeTableModule } from 'primeng/treetable'
import { StepsModule } from 'primeng/steps'
import { VirtualScrollerModule } from 'primeng/virtualscroller'
import { PrimengExtensionModule } from '@palmyra/ng-palmyra'

import { PalmyraTemplateDirective } from '@shared/common'
import { DateFormatPipe } from './pipes/date-format.pipe'
import { NumberFormatterDirective } from './directives/number.directive'
import { NumberPipe } from './pipes/number.pipe'
import { GridPipe } from './pipes/grid.pipe'
import { OperatorPipe } from './pipes/operator.pipe'
import { ArrayFormFilterPipe } from './pipes/filter-arrayform.pipe'
import { CurrencyFormatterDirective } from './directives/currency.directive'
import { ActionPolicyDirective } from './directives/action-policy/action-policy.directive'
import { ScreenDialogComponent } from './components/screen-dialog/screen-dialog.component'
import { ValidatorComponent } from './components/validator/validator.component'
import { HideColumnDirective } from './directives/hide-column.directive'
import { CustomSharedModule } from '@app/shared/custom-shared.module'
import { CustomCurrencyPipe } from './pipes/currency.pipe'
import { TranslateEnumPipe } from './pipes/translate-enum.pipe'
import { TranslatePrimengPipe } from './pipes/translate-primeng.pipe'
import { DynamicValuesPipe } from './pipes/dynamic-values.pipe'
import { DateFormatDirective } from './directives/dateFormat.directive'
import { SeparatorPipe } from './pipes/separator.pipe'
import { CellDirective } from './directives/cell.directive'
import { TextareaDirective } from './directives/text-area.directive'
import { ChartComponent } from './components/chart/chart.component'
import { InputHelpComponent } from './components/input-help/input-help.component'
import { InputInfoComponent } from './components/input-info/input-info.component'
import { VirtualScrollComponent } from './components/virtual-scroll/virtual-scroll.component'
import { BusinessDateDirective } from './directives/business-date.directive'
import { SummaryHeightCalculatorDirective } from './directives/summary-height-calculator.directive'
import { GroupedToggleButtonComponent } from './components/grouped-toggle-button/grouped-toggle-button.component'
import { FormsModule } from '@angular/forms'
import { IsVisibleByRoleDirective } from './directives/visible-by-role.directive'
/**
 * The share module which exports the commun UI modules and components
 * to be used in the other modules
 *
 * @stable
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    StoreModule,
    EffectsModule,
    DialogModule,
    MessageModule,
    CardModule,
    CustomSharedModule,
    DataViewModule,
    DragDropModule,
    ChartModule,
    TooltipModule,
    VirtualScrollerModule,
    FormsModule,
    SelectButtonModule,
  ],
  declarations: [
    PalmyraTemplateDirective,
    BusinessDateDirective,
    DateFormatPipe,
    NumberFormatterDirective,
    CurrencyFormatterDirective,
    ActionPolicyDirective,
    SummaryHeightCalculatorDirective,
    NumberPipe,
    OperatorPipe,
    ArrayFormFilterPipe,
    TranslateEnumPipe,
    TranslatePrimengPipe,
    CustomCurrencyPipe,
    GridPipe,
    DynamicValuesPipe,
    ScreenDialogComponent,
    ValidatorComponent,
    HideColumnDirective,
    DateFormatDirective,
    SeparatorPipe,
    CellDirective,
    IsVisibleByRoleDirective,
    TextareaDirective,
    ChartComponent,
    InputHelpComponent,
    InputInfoComponent,
    VirtualScrollComponent,
    GroupedToggleButtonComponent,
  ],
  exports: [
    CommonModule,
    StoreModule,
    EffectsModule,
    // palmyra-needle-angular-library-export Palmyra will add import angular library module here
    AccordionModule,
    CardModule,
    OverlayPanelModule,
    ContextMenuModule,
    PanelMenuModule,
    MenubarModule,
    MessageModule,
    InputTextareaModule,
    SplitButtonModule,
    InputSwitchModule,
    SelectButtonModule,
    SidebarModule,
    FieldsetModule,
    ConfirmDialogModule,
    AutoCompleteModule,
    MultiSelectModule,
    PaginatorModule,
    DialogModule,
    DropdownModule,
    TabViewModule,
    PanelModule,
    ToggleButtonModule,
    FileUploadModule,
    PasswordModule,
    SliderModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule,
    CalendarModule,
    KeyFilterModule,
    CheckboxModule,
    RadioButtonModule,
    TableModule,
    ChartModule,
    TooltipModule,
    DataViewModule,
    SlideMenuModule,
    ToastModule,
    TreeTableModule,
    StepsModule,
    VirtualScrollerModule,
    PrimengExtensionModule,

    PalmyraTemplateDirective,
    BusinessDateDirective,
    SummaryHeightCalculatorDirective,
    DateFormatPipe,
    NumberPipe,
    OperatorPipe,
    TranslateEnumPipe,
    TranslatePrimengPipe,
    DynamicValuesPipe,
    CurrencyFormatterDirective,
    NumberFormatterDirective,
    ActionPolicyDirective,
    GridPipe,
    ArrayFormFilterPipe,
    CustomCurrencyPipe,
    SlideMenuModule,
    ScreenDialogComponent,
    ValidatorComponent,
    HideColumnDirective,
    CardModule,
    CustomSharedModule,
    DateFormatDirective,
    DataViewModule,
    DragDropModule,
    SeparatorPipe,
    CellDirective,
    IsVisibleByRoleDirective,
    TextareaDirective,
    ChartComponent,
    InputHelpComponent,
    InputInfoComponent,
    VirtualScrollComponent,
    GroupedToggleButtonComponent,
  ],
  providers: [
    DatePipe,
    NumberPipe,
    TranslateEnumPipe,
    TranslatePrimengPipe,
    CustomCurrencyPipe,
    CurrencyPipe,
    GridPipe,
    DecimalPipe,
    DynamicValuesPipe,
    SeparatorPipe,
  ],
})
export class SharedModule {}
