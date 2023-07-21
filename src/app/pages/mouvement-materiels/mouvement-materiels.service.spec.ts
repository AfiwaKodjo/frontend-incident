import { TestBed } from '@angular/core/testing';

import { MouvementMaterielsService } from './mouvement-materiels.service';

describe('MouvementMaterielsService', () => {
  let service: MouvementMaterielsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MouvementMaterielsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
