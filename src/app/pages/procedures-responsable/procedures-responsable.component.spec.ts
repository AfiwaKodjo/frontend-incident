import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresResponsableComponent } from './procedures-responsable.component';

describe('ProceduresResponsableComponent', () => {
  let component: ProceduresResponsableComponent;
  let fixture: ComponentFixture<ProceduresResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProceduresResponsableComponent]
    });
    fixture = TestBed.createComponent(ProceduresResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
