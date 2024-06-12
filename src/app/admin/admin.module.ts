import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [
    AdminComponent,
    DashbordComponent,
   
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderModule
  
  ]
})
export class AdminModule { }
