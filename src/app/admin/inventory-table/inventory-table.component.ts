import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InventoryTableDataSource, InventoryTableItem } from './inventory-table-datasource';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';
import { EXAMPLE_DATA } from './inventory-table-datasource';
import { AddProductInventoryComponent } from './add-product-inventory/add-product-inventory.component';

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements AfterViewInit ,OnInit {
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<InventoryTableItem>;
  dataSource = new MatTableDataSource<InventoryTableItem>(EXAMPLE_DATA);
  resId=sessionStorage.getItem('restaurant_id')

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','quantity','description','Suppiler Name'];
  constructor(public dialog:MatDialog,private api:ApiService){}

  ngOnInit(): void {
    
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
    const dialogRef = this.dialog.open(AddProductInventoryComponent, {
      width: '500px', // Adjust width as needed
      height:'200px'

    });
    dialogRef.afterClosed().subscribe(result => {
     
      console.log('The dialog was closed');
      // Optionally handle dialog close event
    });
  }
}
