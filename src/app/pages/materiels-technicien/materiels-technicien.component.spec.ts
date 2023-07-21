import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielsTechnicienComponent } from './materiels-technicien.component';

describe('MaterielsTechnicienComponent', () => {
  let component: MaterielsTechnicienComponent;
  let fixture: ComponentFixture<MaterielsTechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterielsTechnicienComponent]
    });
    fixture = TestBed.createComponent(MaterielsTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
