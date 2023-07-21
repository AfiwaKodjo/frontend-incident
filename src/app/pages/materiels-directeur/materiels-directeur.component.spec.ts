import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielsDirecteurComponent } from './materiels-directeur.component';

describe('MaterielsDirecteurComponent', () => {
  let component: MaterielsDirecteurComponent;
  let fixture: ComponentFixture<MaterielsDirecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterielsDirecteurComponent]
    });
    fixture = TestBed.createComponent(MaterielsDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
