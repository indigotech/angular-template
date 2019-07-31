import { Component } from '@angular/core';

@Component({
  selector: 'tq-form',
  template: require('./form-sample.pug'),
})

export class FormSample {

  // events: any[] = [];
  //
  // subcribeToFormChanges() {
  //   // initialize stream
  //   const fieldValueChanges$ = this.<FIELD>.valueChanges; // field name
  //
  //   // subscribe to the stream
  //   fieldValueChanges$.subscribe(x => {
  //     this.events.push({ event: 'STATUS CHANGED', object: x });
  //   });
  // }
}
