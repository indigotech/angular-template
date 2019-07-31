import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { TqValidators, LENGTH_MAX_EMAIL } from 'widgets/forms';

@Component({
  selector: 'guide-form',
  template: require('./form.pug'),
})
export class Form {

  private rangeStart: Date = new Date();
  private rangeEnd: Date = new Date(2017, 4, 4);

  private myForm        : FormGroup;
  private statesForm    : FormGroup;
  private radioForm     : FormGroup;
  private checkboxForm  : FormGroup;
  private datePickerForm: FormGroup;

  private readonly lengthMaxEmail: number = LENGTH_MAX_EMAIL;

  private selectMockData = ['One', 'Two', 'Three'];

  private mockFilteredArray = [
    { id: 1, title: 'Exemplo' },
    { id: 1, title: 'Exemplo2' },
    { id: 1, title: 'Exemplo3' },
    { id: 1, title: 'Exemplo4' },
    { id: 1, title: 'Exemplo5' },
    { id: 1, title: 'Exemplo6' },
    { id: 1, title: 'Exemplo7' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      textField:          ['Text filled', Validators.required],
      numberField:        ['', Validators.required],
      accessoryField:     ['', Validators.required],
      dateField:          [''],
      erasableTextField:  [''],
      maskedTextField:    [''],
      commentsField:      [''],
      baseField:          [''],
      floatLabelField:    [''],
      autocompleteField:  [{ title: '', id: undefined }, Validators.required],
      dateMaskField:      ['', [
        Validators.required,
        TqValidators.datePattern('DD/MM/YYYY'),
        TqValidators.dateTime('DD/MM/YYYY'),
      ]],
      emailField:         ['', [
        Validators.required,
        TqValidators.emailPattern(),
        Validators.maxLength(this.lengthMaxEmail),
      ]],
    });

    this.statesForm = this.fb.group({
      selectField:        [this.selectMockData[0]],
      erasableTextField:  [{value: 'Erasable filled', disabled: true}],
      floatLabelField:    [{value: 'Float filled', disabled: true}],
      baseField:          [{value: 'Base filled', disabled: true}],
    });

    this.radioForm = this.fb.group({
      radioField:   ['radio2'],
      radioField2:  [{value: 'radio4', disabled: true}],
    });

    this.checkboxForm = this.fb.group({
      checkboxField1: [true],
      checkboxField2: [''],
      checkboxField3: [{value: true, disabled: true}],
      checkboxField4: [{value: '', disabled: true}],
    });

    this.datePickerForm = this.fb.group({
      datePickerField1: [''],
    });
  }


  onSubmit(form: FormGroup): void {
    console.warn('you submitted value: ', form.getRawValue());
  }
}
