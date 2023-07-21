import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { directeurGuardGuard } from './directeur-guard.guard';

describe('directeurGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => directeurGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
