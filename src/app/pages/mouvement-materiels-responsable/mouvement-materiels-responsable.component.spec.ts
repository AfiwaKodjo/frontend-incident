import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementMaterielsResponsableComponent } from './mouvement-materiels-responsable.component';

describe('MouvementMaterielsResponsableComponent', () => {
  let component: MouvementMaterielsResponsableComponent;
  let fixture: ComponentFixture<MouvementMaterielsResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MouvementMaterielsResponsableComponent]
    });
    fixture = TestBed.createComponent(MouvementMaterielsResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
