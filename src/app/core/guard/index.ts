export * from './authentication.guard';
export * from './authentication.service';
export * from './authentication.token';
export * from './jwt.service';

import { AuthenticationService } from './authentication.service';
import { AuthenticationToken } from './authentication.token';

// These services cannot be declared inside GuardModule because they are App-Level services
export const GUARD_PROVIDERS = [
  AuthenticationService,
  AuthenticationToken,
];

export { GuardModule } from './guard.module';
