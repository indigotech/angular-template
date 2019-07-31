import { Observable } from 'rxjs/Observable';

const isEmptyObject = function(object: any): boolean {
  return Object.keys(object).length === 1 && Object.keys(object)[0] === '$value';
};

export function TransformEmptyObject(value: any = null) {
  return function (targetClass: any, method: string, methodDescriptor: any) {
    let originalMethod = methodDescriptor.value;

    return {
      value: function () {
        return (<Observable<any>> originalMethod.apply(this, arguments))
          .map(result => isEmptyObject(result) ? value : result);
      },
    };
  };
}
