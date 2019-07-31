import {
  Component,
  ViewChild,
} from '@angular/core';

import { ModalDirective } from 'widgets';

@Component({
  selector: 'guide-other',
  template: require('./other.pug'),
})

export class Other {
  private imgSrc: string = 'http://img.medscape.com/thumbnail_library/dt_151006_mesa_800x600.jpg';
  private brokenImgSrc: string = 'broken_url';
  private placeholderSrc: string = '/assets/img/img-placeholder.png';
  private number: number = 1;

  @ViewChild ('modal') modal: ModalDirective;
  @ViewChild ('modalWithScroll') modalWithScroll: ModalDirective;
  @ViewChild('fullscreen') fullscreen;

  onFullscreenOpen() {
    this.fullscreen.open();
  }

  onModalOpen() {
    this.modal.open();
  }

  onOverscrollModalOpen() {
    this.modalWithScroll.open();
  }

}
