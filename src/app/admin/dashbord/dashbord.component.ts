import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  pageTitle: string = 'Dashboard'; 
  isAdmin=sessionStorage.getItem('isAdmin');
  ngOnInit(): void {
    console.log(this.isAdmin)
  }
 


}
