import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonCustomComponent } from '../button-custom/button-custom.component';
import { InputCustomComponent } from '../input-custom/input-custom.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ButtonCustomComponent, InputCustomComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  random='0'

}
