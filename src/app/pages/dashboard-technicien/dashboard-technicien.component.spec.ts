import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTechnicienComponent } from './dashboard-technicien.component';

describe('DashboardTechnicienComponent', () => {
  let component: DashboardTechnicienComponent;
  let fixture: ComponentFixture<DashboardTechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardTechnicienComponent]
    });
    fixture = TestBed.createComponent(DashboardTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
