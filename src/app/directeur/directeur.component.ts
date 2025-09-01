import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDirecteurComponent } from '../layout/header-directeur/header-directeur.component';
import { RouterOutlet } from '@angular/router';
import { SidebarDirecteurComponent } from '../layout/sidebar-directeur/sidebar-directeur.component';

@Component({
  selector: 'app-directeur',
  standalone: true,
  imports: [CommonModule, HeaderDirecteurComponent, RouterOutlet, SidebarDirecteurComponent],
  template: `
    <app-header-directeur></app-header-directeur>
   <app-sidebar-directeur></app-sidebar-directeur>
    <main id='main' class='main'>
    <!--div class="pagetitle">
      <h1>Dashboard</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="index.html">Home</a></li>
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>
      </nav>
    </div--> 
     <router-outlet></router-outlet> 
  </main>
  `,
  styles: [
  ]
})
export class DirecteurComponent {

}
