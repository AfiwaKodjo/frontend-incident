import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-responsable',
  standalone: true,
  imports: [CommonModule],
  template: `
   <section class="section dashboard">
  <div class="row">

    <!-- Left side columns -->
    <div class="col-lg-12">
      <div class="row">
        <div class="pagetitle">
          <h1>Tableau de bord</h1>
          <br>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">Accueil</a></li>
              <li class="breadcrumb-item active">Tableau de bord</li>
            </ol>
          </nav>
        </div>
      </div>          
    </div>
  </div>
</section>
  `,
  styles: [
  ]
})
export class DashboardResponsableComponent {

}
