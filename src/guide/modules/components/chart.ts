import { Component } from '@angular/core';

import { ChartData, ChartSerie } from 'widgets';
@Component({
  selector: 'guide-chart',
  template: require('./chart.pug'),
})
export class Chart {

  private chartData: ChartData;

  constructor() {
    this.chartData = new ChartData();
    this.chartData.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.chartData.datasets = [
      new ChartSerie('Series A', [65, 59, 80, 81, 56, 55, 40], 'rgba(244, 0, 0, 1)'),
      new ChartSerie('Series B', [28, 48, 40, 19, 86, 27, 90], ['rgba(0, 222, 0, 1)', 'rgba(0, 0, 222, 1)']),
    ];
  }

  chartClicked(data: any[]) {
    alert('Chart clicked');
  }

}
