import { CanActivateFn } from '@angular/router';

export const isAdminGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
