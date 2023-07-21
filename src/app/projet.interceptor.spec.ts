import { TestBed } from '@angular/core/testing';

import { ProjetInterceptor } from './projet.interceptor';

describe('ProjetInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProjetInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProjetInterceptor = TestBed.inject(ProjetInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
