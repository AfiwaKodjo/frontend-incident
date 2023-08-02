import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientsComponent } from './update-clients.component';

describe('UpdateClientsComponent', () => {
  let component: UpdateClientsComponent;
  let fixture: ComponentFixture<UpdateClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateClientsComponent]
    });
    fixture = TestBed.createComponent(UpdateClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
