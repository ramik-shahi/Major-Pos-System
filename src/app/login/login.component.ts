import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Route, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email:string='';
  password:string="";


  constructor(private fb:FormBuilder,private _login:LoginServiceService,private route:Router,private auth:AuthServiceService){}

  ngOnInit(): void {
   // sessionStorage.setItem('isAdmin',"false")
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    });
    console.log(sessionStorage.getItem('isAdmin'))


  }


  login(){
    this.email=this.loginForm.value.email
    this.password=this.loginForm.value.password


    // if(this._login.login(this.email,this.password)){
    //   console.log('hello')
    //   this.route.navigate(['/admin']);

    // }

    // this._login.login(this.email,this.password)
    this.auth.login(this.email,this.password)
  }

}
