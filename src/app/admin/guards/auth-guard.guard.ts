import { CanActivateFn } from '@angular/router';

export enum UserRole{
  User = 'user',
  Admin = 'admin',
  Waiter = 'waiter',
  Kitchen = 'kitchen',
  Reception = 'reception'
  
}


export const authGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
