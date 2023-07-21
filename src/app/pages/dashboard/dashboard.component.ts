import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailsComponent } from "../../components/card-details/card-details.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styles:[
       
    ],
    imports: [CommonModule, CardDetailsComponent]
})
export class DashboardComponent {
    

}
