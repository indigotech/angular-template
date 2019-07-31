 import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'tq-stepper',
  template: require('./stepper.directive.pug'),
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class StepperDirective implements OnInit {

  @Input() label: string;


  @Input() min: number = 0;
  @Input() max: number;

  @Input() count: number = 0;
  @Output()countChange = new EventEmitter<number>();

  constructor(
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.cdr.detach();
  }

  ngAfterViewInit() {
    if (this.max !== undefined && this.min > this.max)
      throw new Error('StepperDirective: [min] parameter cannot be greater than [max]');


    if (this.min > this.count)  {
      this.count = this.min;
    }

    if (this.max !== undefined && this.max < this.count) {
      this.count = this.max;
    }

    setTimeout(() => {
      this.cdr.reattach();
      this.countChange.emit(this.count);
    });
  }

  onStepPlus() {
    if (this.max !== undefined && this.count >= this.max)
      return;

    ++this.count;
    this.countChange.emit(this.count);
  }

  onStepMinus() {
    if (this.count > this.min) {
      --this.count;
      this.countChange.emit(this.count);
    }
  }
}
