import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { StartRatingComponent } from './start-rating/start-rating.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms'; // Add this import
import { MatPaginatorModule } from '@angular/material/paginator';
import { MenuTableComponent } from './menu-table/menu-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { AddMenuComponent } from './add-menu/add-menu.component'; // Add this import
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateMenuComponent } from './update-menu/update-menu.component'; 

@NgModule({
  declarations: [
    MenuComponent,
    StartRatingComponent,
    MenuTableComponent,
    AddMenuComponent,
    UpdateMenuComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSliderModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatListModule,
    FormsModule, // Add this module
    MatPaginatorModule, MatTableModule, MatSortModule // Add this module
  ]
})
export class MenuModule { }
