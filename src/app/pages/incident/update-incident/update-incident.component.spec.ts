import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncidentComponent } from './update-incident.component';

describe('UpdateIncidentComponent', () => {
  let component: UpdateIncidentComponent;
  let fixture: ComponentFixture<UpdateIncidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateIncidentComponent]
    });
    fixture = TestBed.createComponent(UpdateIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
