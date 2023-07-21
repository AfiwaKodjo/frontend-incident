import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDirecteurComponent } from './sidebar-directeur.component';

describe('SidebarDirecteurComponent', () => {
  let component: SidebarDirecteurComponent;
  let fixture: ComponentFixture<SidebarDirecteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SidebarDirecteurComponent]
    });
    fixture = TestBed.createComponent(SidebarDirecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
