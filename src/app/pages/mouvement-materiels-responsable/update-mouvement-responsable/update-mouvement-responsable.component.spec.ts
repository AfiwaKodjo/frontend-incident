import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMouvementResponsableComponent } from './update-mouvement-responsable.component';

describe('UpdateMouvementResponsableComponent', () => {
  let component: UpdateMouvementResponsableComponent;
  let fixture: ComponentFixture<UpdateMouvementResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateMouvementResponsableComponent]
    });
    fixture = TestBed.createComponent(UpdateMouvementResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
