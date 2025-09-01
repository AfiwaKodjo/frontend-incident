import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailsTechnicienComponent } from './incident-details-technicien.component';

describe('IncidentDetailsTechnicienComponent', () => {
  let component: IncidentDetailsTechnicienComponent;
  let fixture: ComponentFixture<IncidentDetailsTechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncidentDetailsTechnicienComponent]
    });
    fixture = TestBed.createComponent(IncidentDetailsTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
