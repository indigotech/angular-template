import { Injectable } from '@angular/core';

import { Renderer } from '@tq-angular/render';

import { SeoData } from './seo.data';
import { SeoMetaData } from './seo.meta-data';
import { SeoElementMetaData } from './seo.element-meta-data';
import { SEO_MAPPED_ITEMS } from './constants';

@Injectable()
export class SeoService {

  private headElement: any;
  private metas: SeoMetaData[];

  constructor(private renderer: Renderer) {
    this.init();
  }

  set(data: SeoData) {
    this.renderer.setTitle(data.title);

    for (let meta of this.metas) {
      this.setMetaData(meta, data);
    }
  }

  private init() {
    this.metas = [];
    this.headElement = this.renderer.getDocumentHead();
    for (let mapItem of SEO_MAPPED_ITEMS) {
      this.addElementMapItemToHead(mapItem);
    }
  }

  private setMetaData(meta: SeoMetaData, data: SeoData) {
    this.renderer.setElementAttribute(meta.element, meta.attr, data[meta.propName] || '');
  }

  private addElementMapItemToHead(mapItem: SeoElementMetaData) {
    this.addElementToHead(mapItem.tag, mapItem.attr, mapItem.attrValue, mapItem.dataAttr, mapItem.dataProp);
  }

  private addElementToHead(tag: string, attr: string, attrValue: string, dataAttr: string, dataProp: string): void {
    const el: any = this.getOrCreateHeadTag(tag, attr, attrValue);

    this.metas.push(new SeoMetaData(el, dataProp, dataAttr));
  }

  private getOrCreateHeadTag(tagName: string, attrName?: string, attrValue?: string): any {
    let el: any = this.renderer.getElement(this.headElement, tagName, attrName, attrValue);

    if (!el) {
      el = this.renderer.createElement(this.headElement, tagName);
      this.renderer.setElementAttribute(el, attrName, attrValue);
    }

    return el;
  }
}
