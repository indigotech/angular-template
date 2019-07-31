
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'svg-cart-animation',
  template: require('./svg-cart.animation.pug'),
})

export class SVGCartAnimation implements OnInit {
  private cartPaper: Snap.Paper;

  constructor() {}

  ngOnInit() {
    this.loadCart();
  }

  /**
   * The cart animation contains 3 steps:
   * Step 1: Putting the items in the cart
   * Step 2: Making the cart go away
   * Step 3: Showing the cart again after the reset
   */
  runCartAnimation() {
    this.putItemsInCart();
  }

  /**
   * Cart Animation
   * Step 1: Putting the items in the cart
   */
  putItemsInCart() {
    const items = this.cartPaper.select('#cart-items');
    const oddItems: Snap.Set = items.selectAll('#item-1, #item-3');
    const evenItems: Snap.Set = items.selectAll('#item-2, #item-4');
    evenItems.animate({ 'transform': 't0,0' }, 350, mina.bounce);
    oddItems.animate({ 'transform': 't0,0' }, 400, mina.bounce, () => this.makeCartGoAway() );
  }

  /**
   * Cart Animation
   * Step 2: Making the cart go away
   */
  makeCartGoAway() {
    const body = this.cartPaper.select('#cart-body');
    const cart = this.cartPaper.select('#cart');
    const items = this.cartPaper.select('#cart-items');

    body.stop().animate({ 'transform': 't0,0 r3' }, 150, mina.easeinout, () => {
        setTimeout(() => {
        body.stop().animate({ 'transform': 't0,0 r0' }, 150, mina.easein);
        cart.stop().animate({ 'transform': 't-85,0' }, 300, mina.easeinout);
        items.stop().animate({ 'transform': 't-85,0' }, 300, mina.easeinout, () => {
          cart.attr({ 'opacity': 0 });
          setTimeout(() => {
            this.resetCart();
            this.showCartAgain();
          }, 400);
        });
      }, 200);
    });
  }

  /**
   * Cart Animation
   * Step 3: Showing the cart again after the reset
   */
  showCartAgain() {
    const cart = this.cartPaper.select('#cart');
    cart.animate({ 'opacity': 1}, 300, mina.easeout);
  }

  // Reset

  resetCart() {
    const items = this.cartPaper.select('#cart-items');
    items.attr({ 'transform': 't0,0' });
    const itemsSeparately = this.cartPaper.selectAll('rect, polygon');
    itemsSeparately.attr({ 'transform': 't0,-65' });
    const cart = this.cartPaper.select('#cart');
    cart.transform('t0,0');
  }

  // Load

  loadCart() {
    this.cartPaper = Snap('#svg-cart');
    Snap.load('assets/svg/ic-cart.svg', (f) => {
      const items = f.select('#cart-items');
      items.attr({ 'opacity': 0.7 });
      this.cartPaper.append(items);

      const cart = f.select('#cart');
      const cartBody = f.select('#cart-body');
      cartBody.attr({
        stroke: '#000',
        strokeWidth: 2,
      });
      this.cartPaper.append(cart);

      this.resetCart();
    });

  }

}
