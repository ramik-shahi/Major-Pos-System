// user-management.component.ts
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee, employees } from './user-datasource';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: false }) table!: MatTable<Employee>;

  dataSource = new MatTableDataSource<Employee>(employees);
  displayedColumns = ['id', 'image', 'name', 'panNumber', 'address', 'phoneNumber', 'position','edit','delete'];
  constructor(public dialog:MatDialog){}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  editEmployee(id:any){
    console.log(id)

  }

  deleteEmployee(id:any){
    console.log(id)

  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent , {
      width: '500px', // Adjust width as needed

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optionally handle dialog close event
    });
  }
}

