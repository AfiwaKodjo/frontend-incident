import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielsResponsableComponent } from './materiels-responsable.component';

describe('MaterielsResponsableComponent', () => {
  let component: MaterielsResponsableComponent;
  let fixture: ComponentFixture<MaterielsResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterielsResponsableComponent]
    });
    fixture = TestBed.createComponent(MaterielsResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
