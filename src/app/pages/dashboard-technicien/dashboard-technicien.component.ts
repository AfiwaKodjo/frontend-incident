import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailsComponent } from "../../components/card-details/card-details.component";

@Component({
    selector: 'app-dashboard-technicien',
    standalone: true,
    template: `
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
export class DashboardTechnicienComponent {

}
