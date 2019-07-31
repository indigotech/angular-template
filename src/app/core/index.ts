export * from './base';
export * from './browser';
export * from './data-source';
export * from './guard';
export * from './seo';
export * from './utils';

import { GUARD_PROVIDERS } from './guard';

// These services cannot be declared inside GuardModule because they are App-Level services
export const CORE_PROVIDERS = [
  ...GUARD_PROVIDERS,
];

export { CoreModule } from './core.module';
