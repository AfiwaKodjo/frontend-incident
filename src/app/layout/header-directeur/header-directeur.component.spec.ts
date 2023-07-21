import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDirecteurComponent } from './header-directeur.component';

describe('HeaderDirecteurComponent', () => {
  let component: HeaderDirecteurComponent;
  let fixture: ComponentFixture<HeaderDirecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderDirecteurComponent]
    });
    fixture = TestBed.createComponent(HeaderDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
