import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTechnicienComponent } from './header-technicien.component';

describe('HeaderTechnicienComponent', () => {
  let component: HeaderTechnicienComponent;
  let fixture: ComponentFixture<HeaderTechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderTechnicienComponent]
    });
    fixture = TestBed.createComponent(HeaderTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
