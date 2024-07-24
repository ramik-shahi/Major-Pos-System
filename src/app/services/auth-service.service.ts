import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '../admin/interface/UserRole';
import { Router } from '@angular/router';
import { ApiService } from 'src/service/api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private  currentUserRole='';

  constructor(private http: HttpClient,private router: Router,private apiservice:ApiService) { }

  login (data:any){

    // if(username==="admin@gmail.com" && password==="admin123"){

    //   this.currentUserRole = 'admin';
    //   this.router.navigate(['/admin/dashboard']);
    //   return this.currentUserRole;

    // }
    // else if(username === "waiter@gmail.com" && password === "waiter123"){
    //   this.currentUserRole = 'waiter';
    //   this.router.navigate(['/admin/menu']);
    //   return this.currentUserRole;


    // }


    // else{
    //   sessionStorage.setItem('isAdmin',"false")
    //   return this.currentUserRole;
    // }


    this.apiservice.login(data).subscribe(Response=>{

      console.log(Response)

      console.log(Response.token)

      console.log(Response.data.role)

       this.currentUserRole=Response.data.role.toLowerCase();

      sessionStorage.setItem('token',Response.token)
      sessionStorage.setItem('user_id',Response.data.user_id)
      sessionStorage.setItem('restaurant_id',Response.data.restaurant_id)
      sessionStorage.setItem('role',this.currentUserRole)

      console.log(  sessionStorage.getItem('role'))

      if(this.currentUserRole=='waiter'){
        this.router.navigate(['/admin/menu']);

      }
      else if(this.currentUserRole=='manager'){
        this.currentUserRole='admin'
        this.router.navigate(['/admin/dashboard']);

      }

      else if(this.currentUserRole=='kitchen'){
        this.currentUserRole='kitchen'
        this.router.navigate(['/admin/order']);

      }

    })




  }
  getRole() {
    return this.currentUserRole;
  }
  isAuthenticated(): boolean {
    return this.currentUserRole !== null;
  }

}
