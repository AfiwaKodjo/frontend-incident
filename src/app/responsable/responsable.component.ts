import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderResponsableComponent } from '../layout/header-responsable/header-responsable.component';
import { SidebarResponsableComponent } from '../layout/sidebar-responsable/sidebar-responsable.component';

@Component({
    selector: 'app-responsable',
    standalone: true,
    template: `
    <app-header-responsable></app-header-responsable>
   <app-sidebar-responsable></app-sidebar-responsable>
    <main id='main' class='main'>
    <!--div class="pagetitle">
      <h1>Tableau de bord</h1>
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
    styles: [],
    imports: [CommonModule, HeaderResponsableComponent, RouterOutlet, SidebarResponsableComponent]
})
export class ResponsableComponent {

}
