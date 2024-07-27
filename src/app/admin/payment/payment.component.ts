import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/service/api.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  stripe: any;
  elements: any;
  card: any;
  clientSecret!: string;

  selectedPaymentMethod!: string;
  tableId!:any;
  resid: any = sessionStorage.getItem('restaurant_id');
  status:any
  total:any


  proceed(){
    console.log('Selected Payment Method:', this.selectedPaymentMethod);
   if(this.selectedPaymentMethod=='3'){ const dataobj={

      restaurant_id:this.resid,
      table_name:this.tableId,
      total:this.total,
      channel:'cash'

    }

    this.api.billGeneration(dataobj).subscribe(res=>{
      console.log(res)
      console.log("BILL status",res.bill_status)
      if(res.bill_status=="processing"){
        this.status='Done';

      }
    })
}

else if(this.selectedPaymentMethod=='1'){

  // this.api.Client()

}


  }


  constructor(private route: ActivatedRoute,private api: ApiService) {
    this.route.paramMap.subscribe(params => {
      this.tableId = params.get('id');
      this.total=params.get('total');
      console.log(this.tableId )

      // Use tableId as needed
    });
  }
  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51NWB9OBaidl5YFJA3MXkB5RLJSmnxQ8bVR4JwEHaMGgcQSdBwy3uRdXhAcHceDqz6cyhEVQmLArESF0fznmlFW8e005eKPrOlg');
   
  }

  

}
