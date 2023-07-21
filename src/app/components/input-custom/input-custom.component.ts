import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-custom',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.css']
})
export class InputCustomComponent {

  @Input() value = ""

  doLog(){
    console.log('InputCustomComponent')
  }
}
