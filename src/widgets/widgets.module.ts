import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformModule } from '@tq-angular/platform';
import { RenderModule } from '@tq-angular/render';
import { ChartsModule } from 'ng2-charts';

import { UtilsModule } from './utils/utils.module';
import { TqFormsModule } from './forms/forms.module';

import {
    AccordionDirective,
    AccordionItemDirective,
    ButtonLoadingDirective,
    CalloutDirective,
    ChartDirective,
    DropdownDirective,
    FilterCheckedPipe,
    FlashDirective,
    FullscreenDirective,
    ImageFallbackDirective,
    ImageBgLoadingFallbackDirective,
    ImageZoomDirective,
    ImageZoomGesturesDirective,
    LoadingDirective,
    MenuGesturesDirective,
    ModalDirective,
    OrbitControlDirective,
    OrbitGesturesDirective,
    OrbitItemDirective,
    OrbitDirective,
    PaginationDirective,
    StepperDirective,
    SVGCartAnimation,
    SvgAnimationTests,
    SVGTrashAnimation,
    TabsDirective,
    TabItemDirective,
    TabHeadingDirective,
} from './';

const directives = [
    AccordionDirective,
    AccordionItemDirective,
    ButtonLoadingDirective,
    CalloutDirective,
    ChartDirective,
    DropdownDirective,
    FilterCheckedPipe,
    FlashDirective,
    FullscreenDirective,
    ImageFallbackDirective,
    ImageBgLoadingFallbackDirective,
    ImageZoomDirective,
    ImageZoomGesturesDirective,
    LoadingDirective,
    MenuGesturesDirective,
    ModalDirective,
    OrbitControlDirective,
    OrbitGesturesDirective,
    OrbitItemDirective,
    OrbitDirective,
    PaginationDirective,
    StepperDirective,
    SVGCartAnimation,
    SvgAnimationTests,
    SVGTrashAnimation,
    TabsDirective,
    TabItemDirective,
    TabHeadingDirective,
];

@NgModule({
  imports:      [
    CommonModule,
    PlatformModule,
    RenderModule,
    UtilsModule,
    TqFormsModule,
    ChartsModule,
  ],
  declarations: [
    ...directives,
  ],
  exports:      [
    ...directives,
    TqFormsModule,
    CommonModule,
  ],
})
export class WidgetsModule { }
