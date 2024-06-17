import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule
  ],
  exports:[
    OrderComponent
  ]
})
export class OrderModule { }
