import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDirecteurComponent } from './incident-directeur.component';

describe('IncidentDirecteurComponent', () => {
  let component: IncidentDirecteurComponent;
  let fixture: ComponentFixture<IncidentDirecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncidentDirecteurComponent]
    });
    fixture = TestBed.createComponent(IncidentDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
