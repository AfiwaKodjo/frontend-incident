import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaterielsComponent } from './update-materiels.component';

describe('UpdateMaterielsComponent', () => {
  let component: UpdateMaterielsComponent;
  let fixture: ComponentFixture<UpdateMaterielsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateMaterielsComponent]
    });
    fixture = TestBed.createComponent(UpdateMaterielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
