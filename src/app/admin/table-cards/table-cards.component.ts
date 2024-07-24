// table-cards.component.ts
import { Component,Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.css']
})
export class TableCardsComponent {
  @Output() tableSelected = new EventEmitter<string>();
  tables = [
    { number: '01', amount: 10 },
    { number: '02', amount: 50 },
    { number: '03', amount: 50 },
    { number: '04', amount: 50 },
    { number: '05', amount: 50 },
    { number: '06', amount: 50 },
    { number: '07', amount: 50 }
  ];
  constructor(private router:Router){

  }

  addOrder(table_number:any){
    console.log(table_number)
    this.router.navigate([`/admin/menu/${table_number}`]);
  }

  viewOrder(table_number:any){
    console.log("the order you want view is of table",table_number)
    this.tableSelected.emit(table_number);
    
  }
}
