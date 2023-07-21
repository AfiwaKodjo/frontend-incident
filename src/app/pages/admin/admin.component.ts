import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-admin',
    standalone: true,
    template: `
    <app-header></app-header>
   <app-sidebar></app-sidebar>
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
    styles: [],
    imports: [CommonModule, SidebarComponent, HeaderComponent, RouterOutlet]
})
export class AdminComponent{
  

}
