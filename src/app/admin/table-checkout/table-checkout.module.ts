import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCheckoutComponent } from './table-checkout.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CheckoutComponent } from './checkout/checkout.component'; // Import MatButtonModule

@NgModule({
  declarations: [
    TableCheckoutComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule // Ensure this is included
  ],
  exports: [
    TableCheckoutComponent,
    CheckoutComponent
  ]
})
export class TableCheckoutModule { }
