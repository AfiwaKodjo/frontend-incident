import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentTechnicienComponent } from './incident-technicien.component';

describe('IncidentTechnicienComponent', () => {
  let component: IncidentTechnicienComponent;
  let fixture: ComponentFixture<IncidentTechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncidentTechnicienComponent]
    });
    fixture = TestBed.createComponent(IncidentTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
