// table-cards.component.ts
import { Component,Output, EventEmitter, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-table-cards',
  templateUrl: './table-cards.component.html',
  styleUrls: ['./table-cards.component.css']
})
export class TableCardsComponent implements OnInit {
  @Output() tableSelected = new EventEmitter<string>();
  tables!:any[];
  constructor(private router:Router,private api:ApiService){

  }
  ngOnInit(): void {
    const resId=sessionStorage.getItem('restaurant_id')
    this.api.getTable(resId).subscribe(res=>{
      this.tables=res
      console.log(this.tables)
      
    })
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
