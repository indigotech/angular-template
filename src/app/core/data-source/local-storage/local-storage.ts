import { Storage } from './storage';

/**
 * Decorator to make a property automatically bound to a browser local storage.
 * The first argument is the storage key.
 *
 * ```typescript
 * import { LocalStorage } from 'core/'
 *
 * class NeedsLocalStorage {
 *   @LocalStorage('my-prop-stored-in-local-storage')
 *   private myProp: any;
 *
 *   constructor() {}
 * }
 * ```
 */
export function LocalStorage(key: string) {
  return function decorateWithLocalStorage(target: any, propKey: string) {

    let value;

    function getter() {
      if (value === null || value === undefined) {
        value = Storage.getObject(key);
      }

      return value;
    }

    function setter(newValue) {
      value = newValue;
      Storage.putObject(key, value);
    }

    Object.defineProperty(target, propKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
