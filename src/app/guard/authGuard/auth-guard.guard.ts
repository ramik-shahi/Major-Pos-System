// src/app/guards/auth.guard.ts
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const expectedRoles = route.data['expectedRoles'] as string;
  if (!expectedRoles || expectedRoles.length === 0) {
    console.error('expectedRoles is undefined or empty');
    return false;
  }


  const currentUserRole=authService.getRole();

  if (authService.isAuthenticated() && expectedRoles.includes(currentUserRole)) {
    return true;
  } else {
    router.navigate(['/login']);
    console.log(expectedRoles)
    return false;
  }
};
