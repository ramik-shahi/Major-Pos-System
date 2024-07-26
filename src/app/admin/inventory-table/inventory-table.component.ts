import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { InventoryTableDataSource, InventoryTableItem } from './inventory-table-datasource';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';
import { EXAMPLE_DATA } from './inventory-table-datasource';
import { AddProductInventoryComponent } from './add-product-inventory/add-product-inventory.component';

export interface Product {
  id: number;
  name: string;
  quantity: number;
  description: string;
  rate: number;
  supplierName: string;
}

@Component({
  selector: 'app-inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.css']
})
export class InventoryTableComponent implements AfterViewInit ,OnInit {
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<InventoryTableItem>;
  displayedColumns: string[] = ['id', 'name', 'quantity', 'description', 'rate', 'supplierName', 'quantityIncDec'];
  dataSource!: MatTableDataSource<Product>;
  resId=sessionStorage.getItem('restaurant_id')

  
  constructor(public dialog:MatDialog,private api:ApiService){
     // Example data, replace with your actual data
     const products: Product[] = [
      { id: 1, name: 'Product 1', quantity: 10, description: 'Description 1', rate: 100, supplierName: 'Supplier 1' },
      { id: 2, name: 'Product 2', quantity: 20, description: 'Description 2', rate: 200, supplierName: 'Supplier 2' },
      // Add more products here
    ];
    this.dataSource = new MatTableDataSource(products);
  }

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
  increaseQuantity(row: Product) {
    row.quantity++;
    this.updateDataSource();
  }

  decreaseQuantity(row: Product) {
    if (row.quantity > 0) {
      row.quantity--;
      this.updateDataSource();
    }
  }

  updateDataSource() {
    // Update the data source to trigger the table update
    this.dataSource.data = [...this.dataSource.data];
  }
}
