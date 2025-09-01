import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIncidentsComponent } from './card-incidents.component';

describe('CardIncidentsComponent', () => {
  let component: CardIncidentsComponent;
  let fixture: ComponentFixture<CardIncidentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardIncidentsComponent]
    });
    fixture = TestBed.createComponent(CardIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
