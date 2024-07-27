import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';


import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { RouterModule } from '@angular/router';
import { UserManagementModule } from './user-management/user-management.module';
import { OrderModule } from './order/order.module';
// import { TableCheckoutModule } from './table-checkout/table-checkout.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CategoryModule } from './add-category/category.module';
import { TableModule } from './table/table.module';
import { MenuModule } from './menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { TableCardsComponent } from './table-cards/table-cards.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TableCheckoutCardComponent } from './table-checkout/table-checkout.component';
import { PaymentComponent } from './payment/payment.component';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// import { TableCheckoutComponent } from './table-checkout/table-checkout.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddProductInventoryComponent } from './inventory-table/add-product-inventory/add-product-inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillTableComponent } from './bill-table/bill-table.component';








@NgModule({
  declarations: [
    AdminComponent,
    DashbordComponent,
    AdminNavComponent,
    TableCardsComponent,
    CheckoutComponent,
    TableCheckoutCardComponent,
    PaymentComponent,
    InventoryTableComponent,
    AddProductInventoryComponent,
    BillTableComponent
    // TableCheckoutComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatCardModule,
    MatRadioModule,
    OrderModule,

    UserManagementModule,
    // TableCheckoutModule,
    MatDialogModule,
    CategoryModule,
    TableModule,
    MenuModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule



  ]
})
export class AdminModule { }
