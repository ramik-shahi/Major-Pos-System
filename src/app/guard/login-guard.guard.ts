import { inject } from '@angular/core';
import { CanActivateFn ,Router} from '@angular/router';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  let _router=inject(Router);
  let isAdmin=sessionStorage.getItem('isAdmin');
  if(isAdmin=='false'){
    
    _router.navigate(['login']);
    return false
   
  }

  return true;
};
