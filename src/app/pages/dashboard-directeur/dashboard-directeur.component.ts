import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailsComponent } from "../../components/card-details/card-details.component";

@Component({
    selector: 'app-dashboard-directeur',
    standalone: true,
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
   <section class="section dashboard">
    <div class="row">

      <!-- Left side columns -->
      <div class="col-lg-8">
        <div class="row">
    <app-card-details title="Sales"></app-card-details>
    <app-card-details title="Customer"></app-card-details>
        </div>
      </div>
    </div>
</section>
  `,
    styles: [],
    imports: [CommonModule, CardDetailsComponent]
})
export class DashboardDirecteurComponent {

}
