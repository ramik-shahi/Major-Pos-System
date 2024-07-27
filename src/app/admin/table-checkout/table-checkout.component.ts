// table-checkout-card.component.ts
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { forkJoin } from 'rxjs';
interface Order {
  item: string;
  qty: number;
  rate: number;
  total: number;
  image: string;
  menuid: string;
  
}

@Component({
  selector: 'app-table-checkout-card',
  templateUrl: './table-checkout.component.html',
  styleUrls: ['./table-checkout.component.css']
})
export class TableCheckoutCardComponent implements OnInit ,OnChanges {
  @Input() selectedTable!: string;
  resid: any = sessionStorage.getItem('restaurant_id');
  orders: Order[] = [];
  subTotal=0
  total=this.subTotal
  add:any
  TABLEID:any
  noOrder:any

  title = 'Checkout';
  constructor(
    private router: Router,
    private api: ApiService
   ) {}


   
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTable']) {
      const currentTable = changes['selectedTable'].currentValue;
      if (currentTable) {
        this.fetchOrders(currentTable);
      }
    }
  }


  fetchOrders(tableId: string) {
    this.TABLEID=tableId;
    console.log(`Fetching orders for table: ${tableId}`);

    this.orders = [];
  
    this.api.getOrderoftables(this.resid, tableId).subscribe(
      (orders: any[]) => {
        console.log('Table orders:', orders);

        if (orders.length === 0) {
          // Handle case with no orders
          this.subTotal = 0;
          this.total = 0;
          console.log('No orders found.');
          this.noOrder='true'

          return;
        }

        this.noOrder='false'
  
        // Extract unique menu_ids
        const menuIds = [...new Set(orders.map(order => order.menu_id))];
  
        //Fetch menu details for each menu_id
        const menuRequests = menuIds.map(menuId => 
          this.api.getMenupic(this.resid, menuId)
        );
  
        // Execute all menu requests
        forkJoin(menuRequests).subscribe(
          (menuResponses: any[]) => {
            console.log('Menu details:', menuResponses);
  
            // Map menu_id to image
            const menuImages = menuResponses.reduce((acc: { [key: string]: string }, menu: any) => {
              console.log('Processing Menu:', menu);
              if (menu && menu._id && menu.item_pic) { 
                acc[menu._id] = menu.item_pic; 
              }
              return acc;
            }, {});
  
            console.log('Menu Images Mapping:', menuImages);
  
            this.orders = orders.map(order => ({
              item: order.item_name,
              qty: order.item_quantity,
              rate: 50,
              total: order.item_quantity * 50,
              image: menuImages[order.menu_id] || '',
              menuid: order.menu_id
            }));
  
            console.log('Processed orders with images:', this.orders);
  
            this.subTotal = this.orders.reduce((acc: number, order: Order) => acc + order.total, 0);
            this.total = this.subTotal;
            console.log('SubTotal:', this.subTotal);
          },
          error => {
            console.error('Error fetching menu details:', error);
          }
        );
      },
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }
  
  
  
  
  ngOnInit(): void {
    console.log("this slected from other component is",this.selectedTable)
    
  }
  table = { number: this.selectedTable };
  // orders = [
  //   { item: 'Pizza', qty: 2, rate: 200, total: 400 , image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg'},
  //   { item: 'Salad', qty: 3, rate: 150, total: 450 , image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg'},
  //   { item: 'Burger', qty: 1, rate: 250, total: 250 , image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg'}
  // ];
  displayedColumns: string[] = ['item', 'qty', 'rate', 'total'];
  
  discount = 0;
  vat = 13;
  // total = this.subTotal 
  onSubmit() {
    this.router.navigate(['/admin/payment/',this.TABLEID,this.total])
 }
}
