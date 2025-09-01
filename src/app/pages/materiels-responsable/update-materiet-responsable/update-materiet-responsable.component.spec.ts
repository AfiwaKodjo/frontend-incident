import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMaterietResponsableComponent } from './update-materiet-responsable.component';

describe('UpdateMaterietResponsableComponent', () => {
  let component: UpdateMaterietResponsableComponent;
  let fixture: ComponentFixture<UpdateMaterietResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateMaterietResponsableComponent]
    });
    fixture = TestBed.createComponent(UpdateMaterietResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
