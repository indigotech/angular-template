import { Component, OnInit } from '@angular/core';

const CENTERING_TRASH_TRANSLATION: string = 't13,13';
const TRASH_GARBAGE_INIT_POSITION_TRANSLATION: string = 't60,10';

@Component({
  selector: 'svg-trash-animation',
  template: require('./svg-trash.animation.pug'),
})

export class SVGTrashAnimation implements OnInit {
  private trashPaper: Snap.Paper;

  constructor() {}

  ngOnInit() {
    this.loadTrash();
  }

  /**
   * The trash animation contains 4 steps:
   * Step 1: Opening the trash top
   * Step 2: Throwing the garbage inside the trash can
   * Step 3: Closing the trash top
   * Step 4: Wiggling the trash
   */
  runTrashAnimation() {
    this.openTrash();
  }

  /**
   * Trash Animation
   * Step 1: Opening the trash top
   */
  openTrash() {
    const top = this.trashPaper.select('#trash-top');
    top.stop().animate({ 'transform': 't-2,-5 r-20' }, 150, mina.easeout, () => {
      setTimeout(() => {
        this.throwGarbage();
      }, 300);
    });
  }

  /**
   * Trash Animation
   * Step 2: Throwing the garbage inside the trash can
   */
  throwGarbage() {
    const garbage = this.trashPaper.select('#trash-garbage');
    garbage.attr({ 'opacity': 0.7 });
    const garbage1 = this.trashPaper.select('#trash-garbage-1');
    const garbage2 = this.trashPaper.select('#trash-garbage-2');

    garbage1.stop().animate({ 'transform': 't-34,20' }, 300, mina.easeinout);
    setTimeout(() => {
      garbage2.stop().animate({ 'transform': 't-34,20' }, 300, mina.easeinout, () => {
        this.resetTrashGarbage();
        this.closeTrash();
      });
    }, 150);

  }

  /**
   * Trash Animation
   * Step 3: Closing the trash top
   */
  closeTrash() {
    const top = this.trashPaper.select('#trash-top');
    top.stop().animate({ 'transform': 'r0'}, 200, mina.easeout, () => {
      this.wiggleTrash();
    });
  }

  /**
   * Trash Animation
   * Step 4: Wiggling the trash
   */
  wiggleTrash() {
    const transformWiggleLeft   = CENTERING_TRASH_TRANSLATION + 'r-8';
    const transformWiggleRight  = CENTERING_TRASH_TRANSLATION + 'r8';
    const transformWiggleNone   = CENTERING_TRASH_TRANSLATION + 'r0';

    const trash = this.trashPaper.select('#trash');
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

  resetTrashGarbage() {
    const garbage = this.trashPaper.select('#trash-garbage');
    garbage.transform(TRASH_GARBAGE_INIT_POSITION_TRANSLATION);
    garbage.attr({ opacity: 0 });
    const garbage1 = this.trashPaper.select('#trash-garbage-1');
    garbage1.transform('t0,0');
    const garbage2 = this.trashPaper.select('#trash-garbage-2');
    garbage2.transform('t0,0');
  }

  // Load

  loadTrash() {
    this.trashPaper = Snap('#svg-trash');
    Snap.load('assets/svg/ic-trash.svg', (f) => {
      const trash = f.select('#trash');
      trash.transform(CENTERING_TRASH_TRANSLATION);
      this.trashPaper.append(trash);

      const garbage = f.select('#trash-garbage');
      garbage.attr({ opacity: 0.7 });
      this.trashPaper.append(garbage);

      this.resetTrashGarbage();
    });

  }

}
