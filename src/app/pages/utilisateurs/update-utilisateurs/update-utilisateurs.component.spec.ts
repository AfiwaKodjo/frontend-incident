import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUtilisateursComponent } from './update-utilisateurs.component';

describe('UpdateUtilisateursComponent', () => {
  let component: UpdateUtilisateursComponent;
  let fixture: ComponentFixture<UpdateUtilisateursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateUtilisateursComponent]
    });
    fixture = TestBed.createComponent(UpdateUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
