export class Storage {
  static getObject(key: string) : Object {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return JSON.parse(window.localStorage.getItem(key));
      } catch (e) {
        return null;
      }
    } else { return null; }
  }
  static putObject(key: string, value: Object) {
    if (typeof window !== 'undefined' && window.localStorage) {
      let valueStr = JSON.stringify(value);
      try {
        window.localStorage.setItem(key, valueStr);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
