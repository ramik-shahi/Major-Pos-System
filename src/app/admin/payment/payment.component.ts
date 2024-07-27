import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  selectedPaymentMethod!: string;
  tableId!:any;
  resid: any = sessionStorage.getItem('restaurant_id');
  status:any


  proceed(){
    console.log('Selected Payment Method:', this.selectedPaymentMethod);
   if(this.selectedPaymentMethod=='3'){ const dataobj={
      restaurant_id:this.resid,
      table_name:this.tableId
    }

    this.api.billGeneration(dataobj).subscribe(res=>{
      console.log(res)
      console.log("BILL status",res.bill_status)
      if(res.bill_status=="processing"){
        this.status='Done';

      }
    })
}


  }


  constructor(private route: ActivatedRoute,private api: ApiService) {
    this.route.paramMap.subscribe(params => {
      this.tableId = params.get('id');
      console.log(this.tableId )
      // Use tableId as needed
    });
  }
  ngOnInit(): void {
   
  }

  

}
