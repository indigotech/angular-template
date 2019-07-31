import { Component, EventEmitter, Input, Output } from '@angular/core';


export class ChartData {
  constructor(public labels?: string[], public datasets?: ChartSerie[]) { }
}

export class ChartSerie {

  constructor(public label?: string, public data?: number[], public backgroundColor?: any) { }
}


@Component({
  selector: 'tq-chart',
  template: require('./chart.directive.pug'),
})
export class ChartDirective  {


  @Input('showLegend') chartShowLegend: boolean   = true;
  @Input('type') chartType          : string    = 'bar';
  @Input('data') chartData          : ChartData = new ChartData();
  @Input() isCustomColor            : boolean = false;
  @Output() click = new EventEmitter<any>();



  private chartOptions : any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  // events
  public chartClicked(e : any) : void {
    this.click.emit(e);
  }
}
