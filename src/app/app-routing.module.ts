import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { loginGuardGuard } from './guard/login-guard.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:'admin',canActivate:[loginGuardGuard],
    loadChildren:()=>
      import('./admin/admin.module').then(m=>m.AdminModule)
  },
  
  { path: '**', component: PagenotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
