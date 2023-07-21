import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementMaterielsComponent } from './mouvement-materiels.component';

describe('MouvementMaterielsComponent', () => {
  let component: MouvementMaterielsComponent;
  let fixture: ComponentFixture<MouvementMaterielsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MouvementMaterielsComponent]
    });
    fixture = TestBed.createComponent(MouvementMaterielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
