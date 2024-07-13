// table-cards.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.css']
})
export class TableCardsComponent {
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
