import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
/**
 * This component exports the collection of items to a file of type XML, XLS, JSON or CSV
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportDataComponent {
  /**
   * The options like fileType, all or current fields
   */
  dataToExportOptions: any[]
  /**
   * The keys of the columns to export
   */
  keysOptions: any[]
  /**
   * The keys option to export, by default all keys
   */
  keys = 'All'
  /**
   * The data to export, by default the selected rows
   */
  dataToExport = 'Selected'
  /**
   * The supported files
   */
  availableFormats: string[] = ['XML2', 'Excel', 'CSV', 'Json']

  /**
   * Closed exportButton
   */
  exportButton = false

  @Input() context: any

  @Input() label: string

  @Input() icon: string
  @Input() disabled: boolean

  constructor() {
    this.dataToExportOptions = [
      { label: $localize`:message;allLabel:All`, value: 'All' },
      {
        label: $localize`:message;selectedLabel:Selected`,
        value: 'Selected',
      },
    ]
    this.keysOptions = [
      { label: $localize`:message;allLabel:All`, value: 'All' },
      {
        label: $localize`:message;currentLabel:Current`,
        value: 'Current',
      },
    ]
  }
  /**
   * Exports the collection of items
   * @param format
   */
  exportData(format) {
    this.context.doExport(this.keys, this.dataToExport, format)
    this.exportButton = !this.exportButton
  }
  /**
   * Gets the format
   * @param event
   * @param overlaypanel
   */
  retrieveFormats(event, overlaypanel) {
    this.exportButton = !this.disabled
    this.exportButton ? overlaypanel.show(event) : overlaypanel.hide(event)
  }
}
