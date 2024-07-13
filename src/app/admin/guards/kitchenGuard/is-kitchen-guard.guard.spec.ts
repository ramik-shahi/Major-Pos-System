import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isKitchenGuardGuard } from './is-kitchen-guard.guard';

describe('isKitchenGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isKitchenGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
