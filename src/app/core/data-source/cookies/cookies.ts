import { CookieOptions } from './cookie-options';

export class Cookies {

  static get(key: string) : string {
    return Cookies.readCookie(key);
  }

  static getObject(key: string) : Object {
    try {
      return JSON.parse(Cookies.readCookie(key));
    } catch (e) {
      return null;
    }
  }

  static put(key: string, value: string, options?: CookieOptions) {
    Cookies.remove(key, options);
    Cookies.writeCookie(key, value, options);
  }

  static putObject(key: string, value: Object, options?: CookieOptions) {
    let valueStr = value ? JSON.stringify(value) : undefined;
    Cookies.remove(key, options);
    Cookies.writeCookie(key, valueStr, options);
  }

  static remove(key: string, options?: CookieOptions) {
    Cookies.writeCookie(key, undefined, options);
  }

  private static readCookie(key: string) : string {
    let cookie = Cookies.getCookie();

    // Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    let regex = new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`);
    let value = cookie.replace(regex, '$1');

    return value;
  }

  private static writeCookie(key: string, value: string, options: CookieOptions) {

    let opts = options || {};

    let expires = opts.expires;

    if (value === null || value === undefined) {
      value = '';
      expires = new Date('Thu, 01 Jan 1970 00:00:00 GMT');
    }

    let cookie = `${key}=${value}`;

    cookie += `;path=${opts.path || '/'}`;
    cookie += opts.domain ? `;domain=${opts.domain}` : '';
    cookie += opts.secure ? `;secure=${opts.secure}` : '';
    cookie += expires ? `;expires=${expires.toUTCString()}` : '';

    Cookies.setCookie(cookie);
  }

  private static getCookie() : string {
    return typeof document !== 'undefined' && document.cookie ? document.cookie : '';
  }

  private static setCookie(cookie: string) {
    if (typeof document !== 'undefined') {
      document.cookie = cookie;
    }
  }
}
