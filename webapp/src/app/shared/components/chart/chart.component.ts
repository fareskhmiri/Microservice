import { Component, Input } from '@angular/core'

import { ChartJSService } from './chart-js-service'
/**
 * This Generic Component displays a chart from chart.js library
 * It takes as input some properties and data to display
 */
@Component({
  selector: 'vp-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  /**
   *The property that holds the chart data
   */
  chartJsData = {};
  /**
   * The property that holds the chart option
   */
  chartJsOptions = {};
  /**
   * Display loading mask when true
   */
  loading = true;
  /***
   * The real type of the chart to draw: bar-chart ,doughnut-chart...
   */
  @Input() realType;
  /***
   * The type of the chart to draw: line,bar...
   */
  @Input() type: string;
  /***
   * Setter method for the provided data
   */
  @Input() set data(value: any) {
    if (value) {
      this.chartJsData = this.chartJsService.getDataSets(
        value,
        this.options,
        this.labelField,
        this.dataField,
        this.dataSetLabel
      );
      this.loading = false;
      this.chartJsOptions = this.chartJsService.getOptions({
        title: this.title,
        showLegend: this.showLegend,
        legendPosition: this.legendPosition,
        showtitle: this.showtitle,
        thikness: this.thikness,
        showTotalNumber: this.showTotalNumber,
        showTotalLabel: this.showTotalLabel,
        totalLabel: this.totalLabel,
        options: this.options,
        value,
        labelField: this.labelField,
        chartJsData: this.chartJsData,
        type: this.type,
        totalNumberFontSize: this.totalNumberFontSize,
      });
    }
  }
  /**
   *The options of chart.js component
   */
  @Input() options: object;
  /**
   * Property that set the height of the chart
   */
  @Input() height = '350px';
  /**
   * Property that show or hide the chart title
   */
  @Input() showtitle = true;
  /**
   * Property that show or hide the chart legends
   */
  @Input() showLegend = true;
  /**
   * Property that set the chart title
   */
  @Input() title: string;
  /**
   * Property that set the legends position
   */
  @Input() legendPosition = 'top';
  /**
   * Property that set the thikness of the doughnut chart
   */
  @Input() thikness;
  /**
   * Property that show/hide the total number in the doughnut chart
   */
  @Input() showTotalNumber = true;
  /**
   * FontSize of the text displayed inside a doughnut chart
   */
  @Input() totalNumberFontSize = '14px';
  /**
   * Property that show/hide the total number labels in the doughnut chart
   */
  @Input() showTotalLabel = true;
  /**
   * Property that set the total number label
   */
  @Input() totalLabel = 'Total: ';
  /**
   * Property that set the label field
   */
  @Input() labelField: string;
  /**
   * Property that set the data field
   */
  @Input() dataField: string;
  /**
   * Property that set the data set label in polarArea & radar chart
   */
  @Input() dataSetLabel: string;
  /**
   *
   * @param chartJsService
   */
  constructor(private chartJsService: ChartJSService) {}
}
