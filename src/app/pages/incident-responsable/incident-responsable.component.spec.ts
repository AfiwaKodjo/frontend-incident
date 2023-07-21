import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentResponsableComponent } from './incident-responsable.component';

describe('IncidentResponsableComponent', () => {
  let component: IncidentResponsableComponent;
  let fixture: ComponentFixture<IncidentResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncidentResponsableComponent]
    });
    fixture = TestBed.createComponent(IncidentResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
