import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    NavbarComponent,
    
  ],
  imports: [
    CommonModule,
     MatSidenavModule,
    MatListModule,
    MatToolbarModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
