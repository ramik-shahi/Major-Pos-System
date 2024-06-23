import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { loginGuardGuard } from '../guard/login-guard.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { MenuComponent } from './menu/menu.component';
import { AddUserComponent } from './user-management/add-user/add-user.component';
import { OrderComponent } from './order/order.component';
import { TableCheckoutComponent } from './table-checkout/table-checkout.component';
import { CategoryComponent } from './add-category/category/category.component';
import { AddCategoryComponent } from './add-category/add-category/add-category.component';
import { TableComponent } from './table/table/table.component';

const routes: Routes = [
  // { path: '', component: AdminComponent },
  // { path: 'dash', component: DashbordComponent },
  {path:'',component:AdminComponent ,   children:[

    {path:'dashboard',component:DashbordComponent,data: { title: 'Dashboard' } },

    {path:'user-management',component:UserManagementComponent,data: { title: 'User Management' },children:[
      {path:'add-employee',component:AddUserComponent },

    ] },

    {path:'menu',component:MenuComponent,data: { title: 'Menu' } },

    {path:'order',component:OrderComponent,data: { title: 'Order' } },
    { path: 'Take-Order/Checkout', component:TableCheckoutComponent },
    { path: 'catogory', component:CategoryComponent },
    { path: 'add-catogory', component:AddCategoryComponent },
    { path: 'table', component:TableComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }






  ],},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
