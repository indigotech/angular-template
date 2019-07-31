import { Component, OnInit } from '@angular/core';

const CENTERING_TRASH_TRANSLATION: string = 't13,13';
const TRASH_GARBAGE_INIT_POSITION_TRANSLATION: string = 't60,10';

@Component({
  selector: 'svg-animation-tests',
  template: require('./svg-tests.pug'),
})

export class SvgAnimationTests implements OnInit {
  private paper: Snap.Paper;

  constructor() {}

  ngOnInit() {
    this.loadIcon();
  }

  runAnimation() {
    this.openTrash();
  }

  // Trash Animation

  /**
   * Trash Animation
   * Step 1: Opening trash top
   */
  openTrash() {
    const top = this.paper.select('#trash-top');
    top.stop().animate({ 'transform': 't-2,-5 r-20' }, 150, mina.easeout, () => {
      setTimeout(() => {
        this.throwGarbage();
      }, 300);
    });
  }

  /**
   * Trash Animation
   * Step 2: Throwing the garbage inside trash can
   */
  throwGarbage() {
    const garbage = this.paper.select('#trash-garbage');
    garbage.attr({ 'opacity': 0.7 });
    const garbage1 = this.paper.select('#trash-garbage-1');
    const garbage2 = this.paper.select('#trash-garbage-2');

    garbage1.stop().animate({ 'transform': 't-34,20' }, 300, mina.easeinout);
    setTimeout(() => {
      garbage2.stop().animate({ 'transform': 't-34,20' }, 300, mina.easeinout, () => {
        this.resetIcon();
        this.closeTrash();
      });
    }, 150);

  }

  /**
   * Trash Animation
   * Step 3: Closing trash top
   */
  closeTrash() {
    const top = this.paper.select('#trash-top');
    top.stop().animate({ 'transform': 'r0'}, 200, mina.easeout, () => {
      this.wiggleTrash();
    });
  }

  /**
   * Trash Animation
   * Step 4: Wiggling trash
   */
  wiggleTrash() {
    const transformWiggleLeft   = CENTERING_TRASH_TRANSLATION + 'r-8';
    const transformWiggleRight  = CENTERING_TRASH_TRANSLATION + 'r8';
    const transformWiggleNone   = CENTERING_TRASH_TRANSLATION + 'r0';

    const trash = this.paper.select('#trash');
    trash.stop().animate({ 'transform': transformWiggleLeft }, 70, mina.easeout, () => {
      trash.stop().animate({ 'transform': transformWiggleRight }, 70, mina.easeout, () => {
        trash.stop().animate({ 'transform': transformWiggleLeft }, 70, mina.easeout, () => {
          trash.stop().animate({ 'transform': transformWiggleRight }, 70, mina.easeout, () => {
            trash.stop().animate({ 'transform': transformWiggleNone }, 70, mina.easeout);
          });
        });
      });
    });
  }

  // Reset

  resetIcon() {
    const garbage = this.paper.select('#trash-garbage');
    garbage.transform(TRASH_GARBAGE_INIT_POSITION_TRANSLATION);
    garbage.attr({ opacity: 0 });
    const garbage1 = this.paper.select('#trash-garbage-1');
    garbage1.transform('t0,0');
    const garbage2 = this.paper.select('#trash-garbage-2');
    garbage2.transform('t0,0');
  }

  // Icon init

  loadIcon() {
    this.paper = Snap('#svg-icon');

    Snap.load('assets/svg/ic-trash.svg', (f) => {
      const trash = f.select('#trash');
      trash.transform(CENTERING_TRASH_TRANSLATION);
      this.paper.append(trash);

      const garbage = f.select('#trash-garbage');
      garbage.attr({ opacity: 0.7 });
      this.paper.append(garbage);

      this.resetIcon();
    });
  }

}
