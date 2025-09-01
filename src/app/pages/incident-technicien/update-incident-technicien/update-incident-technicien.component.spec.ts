import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncidentTechnicienComponent } from './update-incident-technicien.component';

describe('UpdateIncidentTechnicienComponent', () => {
  let component: UpdateIncidentTechnicienComponent;
  let fixture: ComponentFixture<UpdateIncidentTechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateIncidentTechnicienComponent]
    });
    fixture = TestBed.createComponent(UpdateIncidentTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
