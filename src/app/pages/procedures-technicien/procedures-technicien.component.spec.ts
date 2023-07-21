import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresTechnicienComponent } from './procedures-technicien.component';

describe('ProceduresTechnicienComponent', () => {
  let component: ProceduresTechnicienComponent;
  let fixture: ComponentFixture<ProceduresTechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProceduresTechnicienComponent]
    });
    fixture = TestBed.createComponent(ProceduresTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
