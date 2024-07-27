import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  pageTitle: string = 'Dashboard'; 
  isAdmin=sessionStorage.getItem('isAdmin');
  resId=sessionStorage.getItem('restaurant_id');
  totaltable:any
  totalSales:any
  totalUser:any
  totalmenu:any

  ngOnInit(): void {
    console.log(this.isAdmin)
    this.api.getTable(this.resId).subscribe( res=>{
      console.log(res.length)
      this.totaltable=res.length
    }

   
      
    )

    this.api.getBill(this.resId).subscribe(res=>{
      this.totalSales=res.length

    })



    this.api.getUser(this.resId).subscribe(res=>{
      console.log(res)
      this.totalUser=res.length
    })

    this.api.getMenu(this.resId).subscribe(res=>{
      this.totalmenu=res.length
      
    })
  }
  constructor(private api:ApiService){
    

  }
 
 


}
