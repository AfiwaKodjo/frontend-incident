import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMouvementMaterielsComponent } from './update-mouvement-materiels.component';

describe('UpdateMouvementMaterielsComponent', () => {
  let component: UpdateMouvementMaterielsComponent;
  let fixture: ComponentFixture<UpdateMouvementMaterielsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateMouvementMaterielsComponent]
    });
    fixture = TestBed.createComponent(UpdateMouvementMaterielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
