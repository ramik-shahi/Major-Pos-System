import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from './user-datasource';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable, { static: false }) table!: MatTable<Employee>;

  dataSource = new MatTableDataSource<Employee>();
  displayedColumns = ['id', 'image', 'name', 'panNumber', 'address', 'phoneNumber', 'position', 'edit', 'delete'];

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {

    const resId = sessionStorage.getItem('restaurant_id');

    this.api.getUser(resId).subscribe(res=>{
      console.log(res);

    })
    if (resId) {
      this.api.getUser(resId).subscribe((res: Employee[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.table.dataSource = this.dataSource;
      }, error => {
        console.error('Error fetching data', error);
      });
    }
  }

  ngAfterViewInit(): void {
    // These are set after the data is fetched in ngOnInit
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editEmployee(id: any) {
    console.log(id);
    // Implement your edit functionality here
  }

  deleteEmployee(id: any) {
    console.log(id);
    // Implement your delete functionality here
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px' // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optionally handle dialog close event
    });
  }

  updateUser(id: any): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '500px' // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optionally handle dialog close event
    });
    console.log(id);
  }
}
