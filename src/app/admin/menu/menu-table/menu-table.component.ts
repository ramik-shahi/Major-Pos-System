import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from 'src/service/api.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddMenuComponent } from '../add-menu/add-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateMenuComponent } from '../update-menu/update-menu.component';
interface MenuTableItem {
  _id: string;
  item_name: string;
  item_description: string;
  item_category: string;
  item_pic: string;
  item_price: number;
  categoryName?: string; // Optional property for category name
}

interface Category {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.css']
})
export class MenuTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MenuTableItem>;

  dataSource = new MatTableDataSource<MenuTableItem>();

  constructor(private api: ApiService,public dialog: MatDialog) {}

  ngOnInit(): void {
    const resId = sessionStorage.getItem('restaurant_id') || '';

    forkJoin([
      this.api.getMenu(resId),
      this.api.getCategory(resId) // Ensure this method returns Observable<Category[]>
    ]).pipe(
      map(([menuItems, categories]: [MenuTableItem[], Category[]]) => {
        // Create a map of category IDs to category names
        const categoryMap = new Map(categories.map((cat: Category) => [cat._id, cat.name]));

        // Add category names to each menu item
        const menuWithCategories = menuItems.map((item: MenuTableItem) => ({
          ...item,
          categoryName: categoryMap.get(item.item_category) || 'Unknown'
        }));

        return menuWithCategories;
      })
    ).subscribe(
      (data) => {
        this.dataSource.data = data;
        console.log("---------------------------------");
        console.log(data);
        console.log("---------------------------------");
      },
      error => {
        console.error('Error fetching menu data or categories', error);
      }
    );
  }



  fetchdata(){
    const resId = sessionStorage.getItem('restaurant_id') || '';

    forkJoin([
      this.api.getMenu(resId),
      this.api.getCategory(resId) // Ensure this method returns Observable<Category[]>
    ]).pipe(
      map(([menuItems, categories]: [MenuTableItem[], Category[]]) => {
        // Create a map of category IDs to category names
        const categoryMap = new Map(categories.map((cat: Category) => [cat._id, cat.name]));

        // Add category names to each menu item
        const menuWithCategories = menuItems.map((item: MenuTableItem) => ({
          ...item,
          categoryName: categoryMap.get(item.item_category) || 'Unknown'
        }));

        return menuWithCategories;
      })
    ).subscribe(
      (data) => {
        this.dataSource.data = data;
        console.log("---------------------------------");
        console.log(data);
        console.log("---------------------------------");
      },
      error => {
        console.error('Error fetching menu data or categories', error);
      }
    );
  }

  displayedColumns = ['id', 'name', 'Description', 'categoryName','itemPrice','edit'];

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
    const dialogRef = this.dialog.open(AddMenuComponent, {
      width: '500px' // Adjust width as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.fetchdata();
      // Optionally handle dialog close event
    });
    this.fetchdata();
  }

  updatemenu(id:any):void{
    console.log(id)
    const dialogRef = this.dialog.open(UpdateMenuComponent, {
      width: '500px', // Adjust width as needed
      data: { userId: id } // Pass the data to the dialog
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optionally handle dialog close event
      this.fetchdata();
    });
    
  }
}
