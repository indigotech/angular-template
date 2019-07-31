import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { PlatformService } from '@tq-angular/platform';
import { Renderer } from '@tq-angular/render';

@Injectable()
export class ScriptLoader {

  private readonly onloadPathBase = 'tqScriptLoaderOnloadPath';
  private readonly onerrorPathBase = 'tqScriptLoaderOnerrorPath';
  private count: number = 0;

  constructor(
    private renderer: Renderer,
    private platform: PlatformService,
  ) { }

  load(url: string): Observable<void> {
    if (this.platform.isBrowser()) {
      return new Observable<void>((subscriber: Subscriber<void>) => {

        let onloadPath = `${this.onloadPathBase}_${this.count}`;
        let onerrorPath = `${this.onerrorPathBase}_${this.count++}`;

        window[onloadPath] = () => { subscriber.next(); subscriber.complete(); };
        window[onerrorPath] = () => subscriber.error(`Error while loading ${url}`);

        let script = this.renderer.createElement(this.renderer.getDocumentHead(), 'script');
        this.renderer
            .setElementAttribute(script, 'src', url)
            .setElementAttribute(script, 'async', true)
            .setElementAttribute(script, 'charset', 'utf-8')
            .setElementAttribute(script, 'onload', `${onloadPath}()`)
            .setElementAttribute(script, 'onerror', `${onerrorPath}()`);
      });
    } else {
      return Observable.of(null);
    }
  }
}
