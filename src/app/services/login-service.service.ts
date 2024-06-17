import { Injectable } from '@angular/core';
import {  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  isAdmin:string="false";

  constructor(private router: Router) { }
  login(email:string,password:string){
    if(email==="admin@gmail.com" && password==="admin123"){
      sessionStorage.setItem('isAdmin',"true")
      this.router.navigate(['/admin/dashboard']); // Redirect to dashboard on successful login
      return true;
      
    }else{
      sessionStorage.setItem('isAdmin',"false")
      return false
    }
    
  }
}
