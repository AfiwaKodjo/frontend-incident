import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielsComponent } from './materiels.component';

describe('MaterielsComponent', () => {
  let component: MaterielsComponent;
  let fixture: ComponentFixture<MaterielsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterielsComponent]
    });
    fixture = TestBed.createComponent(MaterielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
