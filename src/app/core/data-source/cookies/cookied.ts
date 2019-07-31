import { Cookies } from './cookies';

/**
 * Decorator to make a property automatically bound to a browser cookie.
 * The first argument is the cookie key.
 *
 * ```typescript
 * import { Cookied } from './cookied'
 *
 * class NeedsCookie {
 *   @Cookied('my-prop-stored-in-cookies')
 *   private myProp: any;
 *
 *   constructor() {}
 * }
 * ```
 */
export function Cookied(key: string) {
  return function decorateWithCookied(target: any, propKey: string) {

    let value;

    function getter() {
      if (value === null || value === undefined) {
        value = Cookies.getObject(key);
      }

      return value;
    }

    function setter(newValue) {
      value = newValue;
      Cookies.putObject(key, value);
    }

    Object.defineProperty(target, propKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
