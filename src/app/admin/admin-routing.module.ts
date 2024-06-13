import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { loginGuardGuard } from '../guard/login-guard.guard';
import { UserManagementComponent } from './user-management/user-management.component';
import { MenuComponent } from './menu/menu.component';
import { AddUserComponent } from './user-management/add-user/add-user.component';

const routes: Routes = [
  // { path: '', component: AdminComponent },
  // { path: 'dash', component: DashbordComponent },
  {path:'',component:AdminComponent ,   children:[

    {path:'dashboard',component:DashbordComponent,data: { title: 'Dashboard' } },

    {path:'user-management',component:UserManagementComponent,data: { title: 'User Management' },children:[
      {path:'add-employee',component:AddUserComponent },

    ] },

    {path:'menu',component:MenuComponent,data: { title: 'Menu' } },

    
    



  ],},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
