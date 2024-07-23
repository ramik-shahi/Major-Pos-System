import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { Order } from '../interface/order';
import { SocketService } from 'src/app/services/socket/scoket.service'; 

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  resid: any = sessionStorage.getItem('restaurant_id');
  orders: any[] = []; // This will hold the transformed orders
  Sorders:any[]=[];
  
  displayedColumns: string[] = ['order', 'cards'];
  private socketSubscription: any;

  constructor(private api: ApiService, private socketService: SocketService) {}

  ngOnInit(): void {
    if (this.resid) {
      this.api.getOrder(this.resid).subscribe(
        (res: any[]) => {
          console.log('Initial orders fetched:', res);
          this.orders = res;
         // Load initial orders
         this.Sorders=this.orders;
          this.transformOrders(this.orders); // Transform loaded orders
        },
        error => {
          console.error('Error fetching orders:', error);
        }
      );
  
      this.socketService.joinRoom(this.resid);
  
      this.socketService.onNewOrder().subscribe((newOrder: any) => {
        console.log('New order received in component:', newOrder);
  
        // Handle new order
        this.handleNewOrder(newOrder);
      });
    }
  }
  
  handleNewOrder(newOrder: any) {
    // Update orders with the new order
    this.Sorders.push(newOrder);
    console.log(this.Sorders);
    // Transform the updated orders
    this.transformOrders(this.Sorders);
  }

  ngOnDestroy(): void {
    if (this.resid) {
      this.socketService.leaveRoom(this.resid);
    }
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  transformOrders(orders: any[]): void {

    if (!Array.isArray(orders)) {
      orders = [orders]; // Wrap in array if it's a single order
    }
    const tableOrdersMap = new Map<string, any>();

    orders.forEach(order => {
      const tableNo = order.table_name;

      if (tableOrdersMap.has(tableNo)) {
        const existingOrder = tableOrdersMap.get(tableNo);
        existingOrder.cards.push({
          item_name: order.item_name,
          image: order.image
        });
      } else {
        tableOrdersMap.set(tableNo, {
          order: `Table ${tableNo} `,
          cards: [{
            item_name: order.item_name,
            image: order.image
          }]
        });
      }
    });
    this.orders = Array.from(tableOrdersMap.values());
  }
}
