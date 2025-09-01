import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProcedureTechnicienComponent } from './update-procedure-technicien.component';

describe('UpdateProcedureTechnicienComponent', () => {
  let component: UpdateProcedureTechnicienComponent;
  let fixture: ComponentFixture<UpdateProcedureTechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateProcedureTechnicienComponent]
    });
    fixture = TestBed.createComponent(UpdateProcedureTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
