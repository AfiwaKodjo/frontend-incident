import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TableComponent } from './components/table/table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProjetInterceptor } from './projet.interceptor';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles:[]
})
export class AppComponent {
  title = 'gestion-incidents';
}

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent,
    SidebarComponent,
    TableComponent,
    BrowserAnimationsModule,
    FormsModule,
 
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: ProjetInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
