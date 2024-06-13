import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { loginGuardGuard } from '../guard/login-guard.guard';

const routes: Routes = [
  // { path: '', component: AdminComponent },
  // { path: 'dash', component: DashbordComponent },
  {path:'',component:AdminComponent ,   children:[

    {path:'dashboard',component:DashbordComponent,data: { title: 'Dashboard' } },
    



  ],},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
