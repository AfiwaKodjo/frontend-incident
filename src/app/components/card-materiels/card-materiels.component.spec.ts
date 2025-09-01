import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMaterielsComponent } from './card-materiels.component';

describe('CardMaterielsComponent', () => {
  let component: CardMaterielsComponent;
  let fixture: ComponentFixture<CardMaterielsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardMaterielsComponent]
    });
    fixture = TestBed.createComponent(CardMaterielsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
