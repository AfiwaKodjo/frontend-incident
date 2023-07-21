import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-custom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-custom.component.html',
  styleUrls: ['./button-custom.component.css']
})
export class ButtonCustomComponent {

doLog(){
  console.log('ButtonCustomComponent')
}

}
