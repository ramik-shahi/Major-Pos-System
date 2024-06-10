import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  isAdmin:string="false";

  constructor() { }
  login(email:string,password:string){
    if(email==="admin@gmail.com" && password==="admin123"){
      sessionStorage.setItem(this.isAdmin,"true")
      return true
    }else{
      sessionStorage.setItem(this.isAdmin,"false")
      return false
    }
    
  }
}
