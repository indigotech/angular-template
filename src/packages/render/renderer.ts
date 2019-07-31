import { Injectable, Inject, RendererFactory2, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import * as _ from 'custom-lodash';

import { PlatformService } from '../platform';

@Injectable()
export class Renderer {

  private titleTag: any;
  private renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private rendererFactory: RendererFactory2,
    private platform: PlatformService,
  ) {
    this.init();
  }

  setTitle(title: string): void {
    this.renderer.setValue(this.titleTag, title);
  }

  getDocumentHead(): HTMLHeadElement {
    return this.document.head;
  }

  getElement(parentElement: any, tagName: string, attr?: string, value?: string): any {
    if (this.platform.isBrowser()) {
      return this.getBrowserElement(parentElement, tagName, attr, value);
    } else {
      return this.getServerElement(parentElement, tagName, attr, value);
    }
  }

  createElement(parentElement: any, tagName: string): any {
    let element = this.renderer.createElement(tagName);
    this.renderer.appendChild(parentElement, element);
    return element;
  }

  getOrCreateElement(parentElement: any, tagName: string, attr?: string, value?: string): any {
    let element = this.getElement(parentElement, tagName, attr, value);
    element = element || this.createElement(parentElement, tagName);
    return element;
  }

  setElementAttribute(element: any, attr: string, value: any) {
    this.renderer.setAttribute(element, attr, value);
    return this;
  }

  setElementClass(renderElement: any, className: string, isAdd: boolean): void {
    if (isAdd) {
      this.renderer.addClass(renderElement, className);
    } else {
      this.renderer.removeClass(renderElement, className);
    }
  }

  setElementStyle(renderElement: any, styleName: string, styleValue: string): void {
    if (styleValue != null) {
      this.renderer.setStyle(renderElement, styleName, styleValue);
    } else {
      this.renderer.removeStyle(renderElement, styleName);
    }
  }

  invokeElementMethod(renderElement: any, methodName: string, args?: any[]): void {
    if (this.platform.isBrowser()) {
      (renderElement as any)[methodName].apply(renderElement, args);
    }
  }

  private init() {
    this.initRenderer();
    this.initTitleTag();
  }

  private initRenderer() {
    this.renderer = this.rendererFactory.createRenderer(this.document, {
      id: 'tq-dom-renderer',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {},
    });
  }

  private initTitleTag() {
    const headElement = this.document.head;
    this.titleTag = this.getOrCreateElement(headElement, 'title');
  }

  private getBrowserElement(parent: any, tagName: string, attr?: string, value?: string): any {
    if (attr && value) {
      return _.filter(parent.children, child => child.localName === tagName)
              .find(child => _.get(child.attributes.getNamedItem(attr), 'value') === value);
    } else {
      return _.find(parent.children, child => child.localName === tagName);
    }
  }

  private getServerElement(parent: any, tagName: string, attr?: string, value?: string): any {
    if (attr && value) {
      return parent.children
        .filter(child => child.type === 'tag' && child.name === tagName)
        .find(child => _.get(child.attribs, attr) === value);
    } else {
      return parent.children
        .find(child => child.type === 'tag' && child.name === tagName);
    }
  }
}
