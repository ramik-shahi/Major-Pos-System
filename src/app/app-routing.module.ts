import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { loginGuardGuard } from './guard/login-guard.guard';
import { authGuard } from './guard/authGuard/auth-guard.guard';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:'admin',canActivate:[authGuard], data: { expectedRoles: ['admin', 'waiter','kitchen','reception'] },
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
