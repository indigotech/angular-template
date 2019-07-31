export interface EntityEndpoints {
  list: string;
  entity: string;
}
export class CrudResourceMap {
  static readonly example : EntityEndpoints = {
    list   : 'examples',
    entity : 'example',
  };
}
