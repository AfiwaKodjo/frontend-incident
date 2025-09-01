import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientResponsableComponent } from './update-client-responsable.component';

describe('UpdateClientResponsableComponent', () => {
  let component: UpdateClientResponsableComponent;
  let fixture: ComponentFixture<UpdateClientResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UpdateClientResponsableComponent]
    });
    fixture = TestBed.createComponent(UpdateClientResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
