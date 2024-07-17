import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { Order } from '../interface/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  resid: any = sessionStorage.getItem('restaurant_id');
  orders: any[] = []; // This will hold the transformed orders
  displayedColumns: string[] = ['order', 'cards'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (this.resid) {
      this.api.getOrder(this.resid).subscribe(
        (res: any[]) => {
          console.log(res)
          this.transformOrders(res); // Transform received orders
        },
        error => {
          console.error('Error fetching orders:', error);
        }
      );
    }
  }

  transformOrders(orders: any[]): void {
    const tableOrdersMap = new Map<string, any>();

    orders.forEach(order => {
      const tableNo = order.table_name; // Assuming the backend response has a 'table' field

      if (tableOrdersMap.has(tableNo)) {
        const existingOrder = tableOrdersMap.get(tableNo);
        existingOrder.cards.push({
          item_name: order.item_name,
          image: order.image
        });
      } else {
        tableOrdersMap.set(tableNo, {
          order: `Table ${tableNo} `, // Assuming 'time' field in the response
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
