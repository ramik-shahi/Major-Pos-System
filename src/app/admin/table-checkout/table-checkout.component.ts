import { Component } from '@angular/core';

@Component({
  selector: 'app-table-checkout',
  templateUrl: './table-checkout.component.html',
  styleUrls: ['./table-checkout.component.css']
})
export class TableCheckoutComponent {
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
