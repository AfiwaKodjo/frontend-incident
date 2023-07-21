import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresDirecteurComponent } from './procedures-directeur.component';

describe('ProceduresDirecteurComponent', () => {
  let component: ProceduresDirecteurComponent;
  let fixture: ComponentFixture<ProceduresDirecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProceduresDirecteurComponent]
    });
    fixture = TestBed.createComponent(ProceduresDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
