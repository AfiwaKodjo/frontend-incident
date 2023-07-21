import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsResponsableComponent } from './clients-responsable.component';

describe('ClientsResponsableComponent', () => {
  let component: ClientsResponsableComponent;
  let fixture: ComponentFixture<ClientsResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClientsResponsableComponent]
    });
    fixture = TestBed.createComponent(ClientsResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
