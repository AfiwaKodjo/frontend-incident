import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTechnicienComponent } from '../layout/header-technicien/header-technicien.component';
import { RouterOutlet } from '@angular/router';
import { SidebarTechnicienComponent } from '../layout/sidebar-technicien/sidebar-technicien.component';

@Component({
  selector: 'app-technicien',
  standalone: true,
  imports: [CommonModule, HeaderTechnicienComponent, RouterOutlet, SidebarTechnicienComponent],
  template: `
   <app-header-technicien></app-header-technicien>
   <app-sidebar-technicien></app-sidebar-technicien>
    <main id='main' class='main'>
    <div class="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div> 
     <router-outlet></router-outlet> 
  </main>
  `,
  styles: [
  ]
})
export class TechnicienComponent {

}
