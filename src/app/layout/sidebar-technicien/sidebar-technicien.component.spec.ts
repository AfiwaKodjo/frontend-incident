import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTechnicienComponent } from './sidebar-technicien.component';

describe('SidebarTechnicienComponent', () => {
  let component: SidebarTechnicienComponent;
  let fixture: ComponentFixture<SidebarTechnicienComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarTechnicienComponent]
    });
    fixture = TestBed.createComponent(SidebarTechnicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
