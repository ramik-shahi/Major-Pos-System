import { CanActivateFn } from '@angular/router';

export const waiterGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
