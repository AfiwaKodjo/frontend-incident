import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarResponsableComponent } from './sidebar-responsable.component';

describe('SidebarResponsableComponent', () => {
  let component: SidebarResponsableComponent;
  let fixture: ComponentFixture<SidebarResponsableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarResponsableComponent]
    });
    fixture = TestBed.createComponent(SidebarResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
