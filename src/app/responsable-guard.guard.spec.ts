import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { responsableGuardGuard } from './responsable-guard.guard';

describe('responsableGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => responsableGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
