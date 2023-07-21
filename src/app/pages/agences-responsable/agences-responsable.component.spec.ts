import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencesResponsableComponent } from './agences-responsable.component';

describe('AgencesResponsableComponent', () => {
  let component: AgencesResponsableComponent;
  let fixture: ComponentFixture<AgencesResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AgencesResponsableComponent]
    });
    fixture = TestBed.createComponent(AgencesResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
