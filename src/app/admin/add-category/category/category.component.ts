import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  CategoryItem } from './category-datasource';
import { AddUserComponent } from '../../user-management/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { ApiService } from 'src/service/api.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoryItem>;
  dataSource = new MatTableDataSource<CategoryItem>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'category-name','aviable','edit','delete'];
  resId = sessionStorage.getItem('restaurant_id');

  constructor(public dialog:MatDialog,private api:ApiService){}

  ngAfterViewInit(): void {
    
    this.api.getCategory(this.resId).subscribe(res=>{

      this.dataSource.data=res
      console.log(res)
      console.log("this is data source value",this.dataSource)
    })
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent , {
      width: '500px', // Adjust width as needed
      height:'200px'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optionally handle dialog close event
    });
  }

  updatecategory():void{
    const dialogRef = this.dialog.open(UpdateCategoryComponent,{

        width: '500px', // Adjust width as needed
      height:'200px'
    });

    dialogRef.afterClosed().subscribe(result=>{
      console.log('the update close')
    });

  }
}
