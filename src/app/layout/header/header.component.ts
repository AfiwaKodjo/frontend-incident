import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DarkModeToggleComponent } from "../../dark-mode-toggle/dark-mode-toggle.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    providers: [AuthService],
    styles: [],
    imports: [CommonModule, HttpClientModule, RouterModule, FormsModule, MatSlideToggleModule, DarkModeToggleComponent]
})
export class HeaderComponent {
  router: any;

  constructor(private authService: AuthService) { }

  toggle(){
    const element = document.body as HTMLBodyElement
    element.classList.toggle('toggle-sidebar')
  }

  logout(): void {
    this.authService.logout()
      .subscribe(
        () => {
          // Déconnexion réussie
          console.log('c\'est bon')
          this.router.navigate([''])
          // Effectuez toute autre opération nécessaire après la déconnexion
        },
        error => {
          console.error(error);
          // Gérer les erreurs de déconnexion
        }
      );
  }

  
  }

