import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAgenceResponsableComponent } from './update-agence-responsable.component';

describe('UpdateAgenceResponsableComponent', () => {
  let component: UpdateAgenceResponsableComponent;
  let fixture: ComponentFixture<UpdateAgenceResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateAgenceResponsableComponent]
    });
    fixture = TestBed.createComponent(UpdateAgenceResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
