import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRole } from '../admin/interface/UserRole';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private  currentUserRole='';

  constructor(private http: HttpClient,private router: Router) { }

  login (username: string, password: string){
    if(username==="admin@gmail.com" && password==="admin123"){
      // sessionStorage.setItem('isAdmin',"true")
      // sessionStorage.setItem('isWaiter','true')
      // this.router.navigate(['/admin/dashboard']); // Redirect to dashboard on successful login
      this.currentUserRole = 'admin';
      this.router.navigate(['/admin/dashboard']);
      return this.currentUserRole;

    }
    else if(username === "waiter@gmail.com" && password === "waiter123"){
      this.currentUserRole = 'waiter';
      this.router.navigate(['/admin/menu']);
      return this.currentUserRole;


    }


    else{
      sessionStorage.setItem('isAdmin',"false")
      return this.currentUserRole;
    }




  }
  getRole() {
    return this.currentUserRole;
  }
  isAuthenticated(): boolean {
    return this.currentUserRole !== null;
  }

}
