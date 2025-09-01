import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProcedureResponsableComponent } from './update-procedure-responsable.component';

describe('UpdateProcedureResponsableComponent', () => {
  let component: UpdateProcedureResponsableComponent;
  let fixture: ComponentFixture<UpdateProcedureResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateProcedureResponsableComponent]
    });
    fixture = TestBed.createComponent(UpdateProcedureResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
