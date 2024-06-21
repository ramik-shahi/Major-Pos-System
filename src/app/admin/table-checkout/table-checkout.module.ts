import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCheckoutComponent } from './table-checkout.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule

@NgModule({
  declarations: [
    TableCheckoutComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule // Ensure this is included
  ],
  exports: [
    TableCheckoutComponent
  ]
})
export class TableCheckoutModule { }
