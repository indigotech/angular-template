import { Injectable } from '@angular/core';

@Injectable()
export class QueryParamsService {
  parseValues(params: any) {
    let parsedParams = { };

    for (let key in params) {
      parsedParams[key] = this.toArrayOrValue(params[key]);
    }

    return parsedParams;
  }

  private toArrayOrValue(value: string) {
    if (value) {
      let values = value.split(',');

      if (values.length > 1) {
        return values.map(val => JSON.parse(val));
      } else {
        return JSON.parse(value);
      }
    } else {
      return undefined;
    }
  }

}
