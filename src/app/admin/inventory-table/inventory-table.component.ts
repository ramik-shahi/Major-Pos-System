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
  newQuantity:number;
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
  displayedColumns: string[] = ['id', 'name', 'quantity', 'description', 'rate', 'supplierName', 'quantityIncDec','Update Quantity'];
  dataSource!: MatTableDataSource<Product>;
  resId=sessionStorage.getItem('restaurant_id')

  products: Product[] = [];

  
  constructor(public dialog:MatDialog,private api:ApiService){
     // Example data, replace with your actual data
     
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.fetchData();

   
    console.log(this.products)
    this.dataSource.data=this.products
    
  }

  fetchData(){
    this.api.getInven(this.resId).subscribe((res :any[])=>{
      console.log(res);
      this.products=res.map((item:any)=>({
        id: item._id,
        name: item.item_name,
        quantity: item.quantity,
        description: item.description,
        rate: item.rate,
        supplierName: item.suppliers_name,
        newQuantity:item.quantity
      }))
      console.log(this.products)
    this.dataSource.data=this.products
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
    row.newQuantity++;

    

    
    this.updateDataSource();
  }

  decreaseQuantity(row: Product) {
    if (row.quantity > 0) {
      row.newQuantity--;
      // this.updateDataSource();
    }
  }

  updateDataSource() {
    // Update the data source to trigger the table update
    // this.dataSource.data = [...this.dataSource.data];
  }
  updateQty(row:Product){

    const newQty=row.newQuantity
    
    const new_qty={
      Invt_id:row.id,
      quantity:newQty


     
    }

    console.log(new_qty)
    this.api.UpdateInv(new_qty).subscribe(res=>{
      console.log(res);
    })

    this.fetchData();

  }
}
