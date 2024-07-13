import { CanActivateFn } from '@angular/router';

export const isKitchenGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
