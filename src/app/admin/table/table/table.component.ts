import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableDataSource, TableItem } from './table-datasource';


import { MatDialog } from '@angular/material/dialog';
import { AddTableComponent } from '../add-table/add-table.component';
import { UpdateTableComponent } from '../update-table/update-table.component';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit,OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  dataSource = new  MatTableDataSource<TableItem>()
  resId=sessionStorage.getItem('restaurant_id')
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','edit','delete'];
  constructor(public dialog:MatDialog,private api:ApiService){}
  ngOnInit(): void {
    
    this.api.getTable(this.resId).subscribe(res=>{
      this.dataSource.data=res
    })
    
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
   


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openEditDialog(): void {
    const dialogRef = this.dialog.open(AddTableComponent, {
      width: '500px', // Adjust width as needed
      height:'200px'

    });
    dialogRef.afterClosed().subscribe(result => {
      this.api.getTable(this.resId).subscribe(res=>{
        this.dataSource.data=res
      })
      console.log('The dialog was closed');
      // Optionally handle dialog close event
    });
  }

  updateTable(): void {
    const dialogRef = this.dialog.open(UpdateTableComponent, {
      width: '500px', // Adjust width as needed
      height:'200px'

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optionally handle dialog close event
    });
  }

  delete(id:any){
    console.log(id)
    this.api.deletetable(this.resId,id).subscribe(res=>{
      console.log(res)
      
    })
    this.api.getTable(this.resId).subscribe(res=>{
      this.dataSource.data=res
    })
    

  }

}
