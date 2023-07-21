import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { techGuardGuard } from './tech-guard.guard';

describe('techGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => techGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
