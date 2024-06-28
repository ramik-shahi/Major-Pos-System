import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  tables = [
    { number: '01', amount: 10 },
    { number: '02', amount: 50 },
    { number: '02', amount: 50 },
    { number: '02', amount: 50 },
    { number: '02', amount: 50 },
    { number: '02', amount: 50 },
    { number: '02', amount: 50 }
  ];

}
