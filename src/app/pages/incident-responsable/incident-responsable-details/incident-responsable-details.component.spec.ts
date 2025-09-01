import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentResponsableDetailsComponent } from './incident-responsable-details.component';

describe('IncidentResponsableDetailsComponent', () => {
  let component: IncidentResponsableDetailsComponent;
  let fixture: ComponentFixture<IncidentResponsableDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncidentResponsableDetailsComponent]
    });
    fixture = TestBed.createComponent(IncidentResponsableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
