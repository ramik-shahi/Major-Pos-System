// table-checkout-card.component.ts
import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table-checkout-card',
  templateUrl: './table-checkout.component.html',
  styleUrls: ['./table-checkout.component.css']
})
export class TableCheckoutCardComponent {
  title = 'Checkout';
  constructor(
    private router: Router,
   ) {}
  table = { number: '01' };
  orders = [
    { item: 'Pizza', qty: 2, rate: 200, total: 400 , image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg'},
    { item: 'Salad', qty: 3, rate: 150, total: 450 , image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg'},
    { item: 'Burger', qty: 1, rate: 250, total: 250 , image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg'}
  ];
  displayedColumns: string[] = ['item', 'qty', 'rate', 'total'];
  subTotal = 1100;
  discount = 0;
  vat = 13;
  total = this.subTotal + (this.subTotal * this.vat / 100);
  onSubmit() {
    this.router.navigate(['/admin/payment'])
 }
}
