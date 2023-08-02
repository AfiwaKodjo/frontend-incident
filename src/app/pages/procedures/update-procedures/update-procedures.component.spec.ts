import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProceduresComponent } from './update-procedures.component';

describe('UpdateProceduresComponent', () => {
  let component: UpdateProceduresComponent;
  let fixture: ComponentFixture<UpdateProceduresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateProceduresComponent]
    });
    fixture = TestBed.createComponent(UpdateProceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
