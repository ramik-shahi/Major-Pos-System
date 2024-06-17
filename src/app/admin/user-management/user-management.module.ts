import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserManagementComponent,
    AddUserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule ,
    ReactiveFormsModule
  ],exports:[
    UserManagementComponent
  ]
})
export class UserManagementModule { }
