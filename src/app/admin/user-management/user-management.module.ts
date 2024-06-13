import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserManagementComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule 
  ],exports:[
    UserManagementComponent
  ]
})
export class UserManagementModule { }
