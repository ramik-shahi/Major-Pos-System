import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { SocketService } from 'src/app/services/socket/scoket.service'; 
import { forkJoin } from 'rxjs';

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
  private deleteSubscription: any;

  constructor(private api: ApiService, private socketService: SocketService) {}

  ngOnInit(): void {
    if (this.resid) {
      this.api.getOrder(this.resid).subscribe(
            (res: any[]) => {
              console.log('Initial orders fetched:', res);

              const menuIds = [...new Set(res.map(order => order.menu_id))];

              const menuRequests = menuIds.map(menuid=> 
                this.api.getMenupic(this.resid, menuid)
              );

              forkJoin(menuRequests).subscribe(
                (menuresponses: any[])=>{

                  console.log('Menu responses:', menuresponses);

                  const menuImages = menuresponses.reduce((acc:{[key:string]:string},menu:any)=>{
                    if(menu && menu._id && menu.item_pic){
                      acc[menu._id] = menu.item_pic;
                    }
                    return acc;
                  },{});
                  console.log('Menu image responses:', menuImages);
                  this.orders = res.map(order=> ({
                    item_name:order.item_name,
                    image: menuImages[order.menu_id] || '',
                    menuid: order.menu_id,
                    table_name: order.table_name,
                    order_status: order.order_status,
                    order_id: order._id,
                    order_qty:order.item_quantity
                  }));
                  console.log("order on page load:"+this.orders);
                  this.Sorders = this.orders;
                  this.transformOrders(this.orders);
                }

              );

              // this.orders = res;
    // Transform loaded orders
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
        if (!newOrder._id) {
          console.error('Received order without _id:', newOrder);
          return;
        }
        this.handleNewOrder(newOrder);
      });

      // Subscribe to new status updates
      this.statusSubscription = this.socketService.onNewStatus().subscribe((newStatus: any) => {
        console.log('New status received in component:', newStatus);
        this.handleNewStatus(newStatus);
      });

      //subscribe to delete order
      this.deleteSubscription=this.socketService.onDeleteOrder().subscribe((orderId:any)=>{
        console.log('Order deletion received:', orderId);
        this.handleDeleteOrder(orderId);
       
        
      });
    }
  }
  
  handleNewOrder(newOrder: any) {
    console.log("Received new order:", newOrder);
    this.api.getMenupic(this.resid, newOrder.menu_id).subscribe(menu => {
      newOrder.image = menu.item_pic || '';
      const orderObject = {
        order_id: newOrder._id.toString(),
        item_name: newOrder.item_name,
        image: newOrder.image,
        menuid: newOrder.menu_id,
        table_name: newOrder.table_name,
        order_status: newOrder.order_status,
        order_qty:newOrder.item_quantity

      };
      console.log("Pushing new order object:", orderObject);
      this.Sorders.push(orderObject);
      this.transformOrders(this.Sorders);
    });
  }
  handleNewStatus(newStatus: any) {
    console.log("Received new status:", newStatus);
    this.api.getMenupic(this.resid, newStatus.menu_id).subscribe(menu => {
      newStatus.image = menu.item_pic || '';
      
      // Ensure newStatus has all required fields
      const updatedOrder = {
        _id: newStatus._id,
        order_id: newStatus._id, // Add this line
        item_name: newStatus.item_name,
        image: newStatus.image,
        menu_id: newStatus.menu_id,
        table_name: newStatus.table_name,
        order_status: newStatus.order_status
      };
  
      const index = this.Sorders.findIndex(order => order._id === newStatus._id || order.order_id === newStatus._id);
      if (index !== -1) {
        this.Sorders[index] = updatedOrder;
        console.log("Updated order:", updatedOrder);
        this.transformOrders(this.Sorders);
      } else {
        console.error("Could not find order to update:", newStatus);
        // Optionally, you might want to add the new status as a new order
        // this.Sorders.push(updatedOrder);
        // this.transformOrders(this.Sorders);
      }
    });
  }
  

  handleDeleteOrder(orderId: any) {
    this.Sorders = this.Sorders.filter(order => order.order_id !== orderId);
    console.log('Orders after deletion:', this.Sorders);
    this.transformOrders(this.Sorders);
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
    console.log("Input orders in transformOrders:", orders);
    const tableOrdersMap = new Map<string, any>();
    
    orders.forEach(order => {
      console.log("Processing order in transformOrders:", order);
      
      // Safeguard against undefined order
      if (!order) {
        console.error("Encountered undefined order in transformOrders");
        return; // Skip this iteration
      }
  
      const tableNo = order.table_name || 'Unknown';
  
      // Extract ID, handling various cases
      const orderId = order._id
        ? (typeof order._id === 'object' ? order._id.toString() : order._id)
        : order.order_id || 'temp_' + Date.now();
  
      const cardObject = {
        order_id: orderId,
        item_name: order.item_name || 'Unknown Item',
        image: order.image || '',
        order_status: order.order_status || 'Unknown Status',
        order_qty:order.order_qty
      };
  
      if (tableOrdersMap.has(tableNo)) {
        const existingOrder = tableOrdersMap.get(tableNo);
        if((this.role=='waiter' || order.order_status!='Done') && (order.order_status!='Served')) {
          console.log("Adding card to existing table:", cardObject);
          existingOrder.cards.push(cardObject);
        }
      } else {
        if((this.role=='waiter' || order.order_status!='Done') && (order.order_status!='Served')) {
          const newOrderObject = {
            order: ` ${tableNo}`,
            cards: [cardObject]
          };
          console.log("Creating new table order:", newOrderObject);
          tableOrdersMap.set(tableNo, newOrderObject);
        }
      }
    });
    
    this.orders = Array.from(tableOrdersMap.values());
    console.log("-----------------")
    console.log(this.orders)
    console.log("-----------------")
  }

  accept(order_id: any) {
    const data = {
      restaurant_id: this.resid,
      _id: order_id,
      status: 'AcceptOrder'
    };
    console.log(data);
    this.accept_order = true;
    this.api.UpdateOrder(data).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.error('Error updating order:', error);
      }
    );
  }


  complete(order_id: any) {
    console.log("Received order_id in complete function:", order_id);
    
    if (!order_id) {
      console.error('Error: order_id is undefined in complete function');
      return;
    }
  
    const data = {
      restaurant_id: this.resid,
      _id: order_id,
      status: 'Waiting'
    };
  
    console.log("Data to be sent in complete function:", data);
  
    this.accept_order = true;
    this.api.UpdateOrder(data).subscribe(
      res => {
        console.log("Update successful in complete function:", res);
      },
      error => {
        console.error("Update failed in complete function:", error);
      }
    );
  }

  Cancel(order_id:any){
    console.log('Cancel called with order_id:', order_id);
    this.api.deleteOrder(this.resid,order_id).subscribe(res=>{
      console.log(res);
    })
  }

  cancleFromKitchen(order_id:any){
    const data = {
      restaurant_id: this.resid,
      _id: order_id,
      status: 'Cancle' // cancle from kitchen
    };
    console.log(data);
    console.log("this is the order_id", order_id);
    this.accept_order = true;
    this.api.UpdateOrder(data).subscribe(res => {
      console.log(res);
    });

  }


  pick(order_id:any){
    const data = {
      restaurant_id: this.resid,
      _id: order_id,
      status: 'Done' // order picked
    };
    console.log(data);
    console.log("this is the order_id", order_id);
    this.accept_order = true;
    this.api.UpdateOrder(data).subscribe(res => {
      console.log(res);
    });

  }


  served(order_id:any){
    const data = {
      restaurant_id: this.resid,
      _id: order_id,
      status: 'Served' 
    };
    console.log(data);
    console.log("this is the order_id", order_id);
    this.accept_order = true;
    this.api.UpdateOrder(data).subscribe(res => {
      console.log(res);
    });

  }
}
