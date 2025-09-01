import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncidentResponsableComponent } from './update-incident-responsable.component';

describe('UpdateIncidentResponsableComponent', () => {
  let component: UpdateIncidentResponsableComponent;
  let fixture: ComponentFixture<UpdateIncidentResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateIncidentResponsableComponent]
    });
    fixture = TestBed.createComponent(UpdateIncidentResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
