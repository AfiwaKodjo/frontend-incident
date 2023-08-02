import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dark-mode-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
 <!--button (click)="toggleDarkMode()">Switch</button-->

  `,
  styles: [
    `
  :host {
  display: block;
  padding: 25px;
  background-color: white;
  color: black;
  font-size: 25px;
}

:host.dark-mode {
  background-color: black;
  color: white;
}

    `
  ]
})
export class DarkModeToggleComponent {
  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
  }
}
