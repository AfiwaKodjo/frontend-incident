import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAgencesComponent } from './update-agences.component';

describe('UpdateAgencesComponent', () => {
  let component: UpdateAgencesComponent;
  let fixture: ComponentFixture<UpdateAgencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateAgencesComponent]
    });
    fixture = TestBed.createComponent(UpdateAgencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
