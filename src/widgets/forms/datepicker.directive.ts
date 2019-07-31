/*
 * CREDITS
 * Source: https://github.com/zskhan/Angular-2-Datepicker
 * Modified CSS and included support for Translate
 * MIT Licensed
 */

import {
  AfterViewInit, animate, Component, ElementRef, forwardRef, Input, keyframes, HostListener,
  state, style, transition, trigger, ViewChild, ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Calendar } from './calendar';
import * as moment from 'moment';

import { Renderer } from '@tq-angular/render';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerDirective),
  multi: true,
};



@Component({
  selector: '[tq-datepicker]',
  animations: [
    trigger('calendarAnimation', [
      transition('* => left', [
        animate(180, keyframes([
          style({ transform: 'translateX(105%)', offset: 0.5 }),
          style({ transform: 'translateX(-130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 }),
        ])),
      ]),
      transition('* => right', [
        animate(180, keyframes([
          style({ transform: 'translateX(-105%)', offset: 0.5 }),
          style({ transform: 'translateX(130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 }),
        ])),
      ]),
    ]),
  ],
  template: require('./datepicker.directive.pug'),
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})

export class DatepickerDirective implements AfterViewInit, ControlValueAccessor {

  private readonly DEFAULT_FORMAT = 'DD/MM/YYYY';

  private inputEl: HTMLInputElement;
  private _onTouchedCallback: () => {};
  private _onChangeCallback: (_: any) => {};

  @ViewChild('template') template;

  private dateVal: Date;



  // api bindings
  @Input() disabled: boolean;
  @Input() dateFormat: string;
  @Input() rangeStart: Date;
  @Input() rangeEnd: Date;
  // view logic
  @Input() showCalendar: boolean;
  @Input() weekStart: number = 0;

  // time
  @Input() calendarDays: Array<any>;
  @Input() currentMonth: string;
  @Input() dayNames: Array<String> = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Default order: firstDayOfTheWeek = 0
  @Input() hoveredDay: Date;
  @Input() months: Array<string> = [];

  //validator
  @Input() isSubmitted: boolean = false;

  dayNamesOrdered: Array<String>;
  calendar: Calendar;
  currentMonthNumber: number;
  currentYear: number;
  // animation
  animate: string;
  // colors
  colors: { [id: string]: string };
  // listeners
  clickListener: Function;


  constructor(
    inputElement    : ElementRef,
    private vcr     : ViewContainerRef,
    private fb      : FormBuilder,
    private renderer: Renderer,
  ) {

    this.inputEl = inputElement.nativeElement;

    // time
    this.updateDayNames();
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  }

  ngAfterViewInit() {
    this.vcr.createEmbeddedView(this.template);
  }

  /**
  * Toggles the calendar when the date input is clicked
  */
  @HostListener('click') click() {
    this.showCalendar = !this.showCalendar;
  }


  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== '') {
      const dateFormat: string = this.dateFormat;

      if (dateFormat === undefined || dateFormat === null) {
        this.dateVal = moment(value, this.DEFAULT_FORMAT).toDate();
      } else {
        this.dateVal = moment(value, dateFormat).toDate();
      }
    }

    this.syncVisualsWithDate();
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) {
      this.renderer.setElementAttribute(this.inputEl, 'disabled', 'true');
    } else {
      this.renderer.setElementAttribute(this.inputEl, 'disabled', null);
    }
  }

  // -------------------------------------------------------------------------------- //
  // -------------------------------- State Management ------------------------------ //
  // -------------------------------------------------------------------------------- //
  /**
  * Closes the calendar and syncs visual components with selected or current date.
  * This way if a user opens the calendar with this month, scrolls to two months from now,
  * closes the calendar, then reopens it, it will open with the current month
  * or month associated with the selected date
  */
  closeCalendar(): void {
    this.showCalendar = false;
    this.syncVisualsWithDate();
  }

  /**
  * Visually syncs calendar and input to selected date or current day
  */
  syncVisualsWithDate(): void {
    if (this.dateVal) {
      this.setInputText(this.dateVal);
      this.setCurrentValues(this.dateVal);
    } else {
      let now : Date = new Date();


      if (this.rangeEnd && (now.getTime() >= this.rangeEnd.getTime())) {
        this.setCurrentValues(this.rangeEnd);
      } else if (this.rangeStart && (now.getTime() <= this.rangeStart.getTime())) {
        this.setCurrentValues(this.rangeStart);
      } else {
        this.setCurrentValues(now);
      }
      this.inputEl.value = '';

      // Fix to 'delay' the changeCallback fn
      setTimeout(() => { this._onChangeCallback(''); }, 0);
    }
  }

  /**
  * Sets the date values associated with the ui
  */
  private setCurrentValues(date: Date) {
    this.currentMonthNumber = date.getMonth();
    this.currentMonth       = this.months[this.currentMonthNumber];
    this.currentYear        = date.getFullYear();

    const calendarArray     = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays       = [].concat.apply([], calendarArray);
    this.calendarDays       = this.filterInvalidDays(this.calendarDays);

  }

  /**
   * Update the day names order. The order can be modified with the firstDayOfTheWeek input, while 0 means that the
   * first day will be sunday.
   */
  private updateDayNames() {
    this.dayNamesOrdered = this.dayNames.slice(); // Copy DayNames with default value (weekStart = 0)
    if (this.weekStart < 0 || this.weekStart >= this.dayNamesOrdered.length) {
      // Out of range
      throw Error(`The weekStart is not in range between ${0} and ${this.dayNamesOrdered.length - 1}`);
    } else {
      this.calendar = new Calendar(this.weekStart);
      this.dayNamesOrdered = this.dayNamesOrdered.slice(this.weekStart, this.dayNamesOrdered.length)
        .concat(this.dayNamesOrdered.slice(0, this.weekStart)); // Append beginning to end
    }
  }


  /**
  * Sets the currentMonth and creates new calendar days for the given month
  */
  setCurrentMonth(monthNumber: number): void {
    this.currentMonth = this.months[monthNumber];
    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
    this.calendarDays = this.filterInvalidDays(this.calendarDays);
  }

  /**
  * Sets the currentYear
  */
  setCurrentYear(year: number): void {
    this.currentYear = year;
  }

  /**
  * Sets the visible input text
  */
  setInputText(date: Date): void {
    let inputText = '';
    const dateFormat: string = this.dateFormat;
    if (dateFormat === undefined || dateFormat === null) {
      inputText = moment(date).format(this.DEFAULT_FORMAT);
    } else if (typeof dateFormat === 'string') {
      inputText = moment(date).format(dateFormat);
    }
    this.inputEl.value = inputText;

    // Fix to 'delay' the changeCallback fn
    setTimeout(() => { this._onChangeCallback(inputText); }, 0);
  }

  onDateSelect(date: Date): void {
    this.setInputText(date);
    this._onChangeCallback(this.inputEl.value);
  }

  // -------------------------------------------------------------------------------- //
  // --------------------------------- Click Handlers ------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Sets the date values associated with the calendar.
  * Triggers animation if the month changes
  */
  onArrowClick(direction: string): void {
    const currentMonth: number = this.currentMonthNumber;
    let newYear: number = this.currentYear;
    let newMonth: number;
    // sets the newMonth
    // changes newYear is necessary
    if (direction === 'left') {
      if (currentMonth === 0) {
        newYear = this.currentYear - 1;
        newMonth = 11;
      } else {
        newMonth = currentMonth - 1;
      }
    } else if (direction === 'right') {
      if (currentMonth === 11) {
        newYear = this.currentYear + 1;
        newMonth = 0;
      } else {
        newMonth = currentMonth + 1;
      }
    }

    // check if new date would be within range
    let newDate = new Date(newYear, newMonth);
    let newDateValid: boolean = true;

    if (direction === 'left' && this.rangeStart) {
      newDateValid =  newDate.getFullYear() > this.rangeStart.getFullYear() ||
                      (newDate.getFullYear() === this.rangeStart.getFullYear() && newDate.getMonth() >= this.rangeStart.getMonth());
    } else if (direction === 'right' && this.rangeEnd) {
      newDateValid =  newDate.getFullYear() < this.rangeEnd.getFullYear() ||
                      (newDate.getFullYear() === this.rangeEnd.getFullYear() && newDate.getMonth() <= this.rangeEnd.getMonth());
    }

    if (newDateValid) {
      this.setCurrentYear(newYear);
      this.currentMonthNumber = newMonth;
      this.setCurrentMonth(newMonth);
      this.triggerAnimation(direction);
    }
  }

  /**
   * Check if a date is within the range.
   * @param date The date to check.
   * @return true if the date is within the range, false if not.
   */
  isDateValid(date: Date): boolean {
    return (!this.rangeStart || date.getTime() >= this.rangeStart.getTime()) &&
           (!this.rangeEnd || date.getTime() <= this.rangeEnd.getTime());
  }

  /**
   * Filter out the days that are not in the date range.
   * @param calendarDays The calendar days
   * @return {Array} The input with the invalid days replaced by 0
   */
  filterInvalidDays(calendarDays: Array<number>): Array<number> {
    let newCalendarDays = [];

    calendarDays.forEach((day: number | Date) => {
      if (day === 0) {
        newCalendarDays.push(undefined);
      } else if (!this.isDateValid(<Date> day)) {
        newCalendarDays.push({value: day, isActive: false});
      } else {
        newCalendarDays.push({value: day, isActive: true});
      }
    });

    return newCalendarDays;
  }

  /**
  * Closes the calendar when the cancel button is clicked
  */
  onCancel(): void {
    this.isSubmitted = true;
    this.onDateSelect(this.dateVal);
    this.closeCalendar();
  }

  /**
  * Clean input text
  */
  onClean(): void {
    this.isSubmitted = true;
    this.dateVal = null;
    this.inputEl.value = '';
    this.onDateSelect(this.dateVal);
    this.closeCalendar();
  }


  /**
  * Returns the font color for a day
  */
  onSelectDay(day: Date): void {

    if (this.isDateValid(day)) {
      this.dateVal = day;
      this.onDateSelect(day);
      this.showCalendar = !this.showCalendar;
    }
  }

  // -------------------------------------------------------------------------------- //
  // ----------------------------------- Helpers ------------------------------------ //
  // -------------------------------------------------------------------------------- //

  /**
  * Returns whether a day is the chosen day
  */
  isChosenDay(day: Date): boolean {
    if (day) {
      return this.dateVal ? day.toDateString() === this.dateVal.toDateString() : false;
    } else {
      return false;
    }
  }

  /**
  * Returns whether a day is the day currently being hovered
  */
  isHoveredDay(day: Date): boolean {
    return this.hoveredDay ? this.hoveredDay === day && !this.isChosenDay(day) : false;
  }

  /**
  * Triggers an animation and resets to initial state after the duration of the animation
  */
  triggerAnimation(direction: string): void {
    this.animate = direction;
    setTimeout(() => this.animate = 'reset', 185);
  }
}
