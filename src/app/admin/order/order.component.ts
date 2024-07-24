import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { SocketService } from 'src/app/services/socket/scoket.service'; 

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  resid: any = sessionStorage.getItem('restaurant_id');
  role:any=sessionStorage.getItem('role');
  orders: any[] = []; // This will hold the transformed orders
  Sorders: any[] = [];
  table: any[] = [];
  accept_order = false;
  
  displayedColumns: string[] = ['order', 'cards'];
  private socketSubscription: any;
  private statusSubscription: any;

  constructor(private api: ApiService, private socketService: SocketService) {}

  ngOnInit(): void {
    if (this.resid) {
      // Fetch initial orders
      this.api.getOrder(this.resid).subscribe(
        (res: any[]) => {
          console.log('Initial orders fetched:', res);
          this.orders = res;
          this.Sorders = this.orders;
          this.transformOrders(this.orders); // Transform loaded orders
        },
        error => {
          console.error('Error fetching orders:', error);
        }
      );
  
      // Join the socket room
      this.socketService.joinRoom(this.resid);
  
      // Subscribe to new orders
      this.socketSubscription = this.socketService.onNewOrder().subscribe((newOrder: any) => {
        console.log('New order received in component:', newOrder);
        this.handleNewOrder(newOrder);
      });

      // Subscribe to new status updates
      this.statusSubscription = this.socketService.onNewStatus().subscribe((newStatus: any) => {
        console.log('New status received in component:', newStatus);
        this.handleNewStatus(newStatus);
      });
    }
  }
  
  handleNewOrder(newOrder: any) {
    // Update orders with the new order
    this.Sorders.push(newOrder);
    console.log(this.Sorders);
    this.transformOrders(this.Sorders);
  }

  handleNewStatus(newStatus: any) {
    // Update orders with the new status
    const index = this.Sorders.findIndex(order => order._id === newStatus._id);
    if (index !== -1) {
      this.Sorders[index] = newStatus;
      console.log(this.Sorders);
      this.transformOrders(this.Sorders);
    }
  }

  ngOnDestroy(): void {
    if (this.resid) {
      this.socketService.leaveRoom(this.resid);
    }
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
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
          order_id: order._id,
          item_name: order.item_name,
          image: order.image,
          order_status: order.order_status
        });
      } else {
        tableOrdersMap.set(tableNo, {
          order: `Table ${tableNo} `,
          cards: [{
            order_id: order._id,
            item_name: order.item_name,
            image: order.image,
            order_status: order.order_status
          }]
        });
      }
    });
    console.log("-----------------")
    console.log(this.orders)
    console.log("-----------------")
    this.orders = Array.from(tableOrdersMap.values());
  }

  accept(order_id: any) {
    const data = {
      restaurant_id: this.resid,
      _id: order_id,
      status: 'AcceptOrder'
    };
    console.log(data);
    console.log("this is the order_id", order_id);
    this.accept_order = true;
    this.api.UpdateOrder(data).subscribe(res => {
      console.log(res);
    });
  }
}
