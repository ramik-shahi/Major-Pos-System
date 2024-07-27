import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/service/api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  
  constructor(private fb:FormBuilder,private apiservice:ApiService){}

  registration!:FormGroup
  createNewUser!:object
  createNewResturant!:object


  ngOnInit(): void {

    this.registration=this.fb.group({
      name:['',[Validators.required]],
      location:this.fb.group({

        address: [''],
        city: [''],
        state: [''],
        zip: [null]

      }),
      coordinates: this.fb.group({
        latitude: [null],
        longitude: [null]
      }),
      phone: [''],
      email: ['', [Validators.required, Validators.email]],

      manager: this.fb.group({
        name: ['', [Validators.required]],
        address: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        panNumber: [''],
        position: ['manager']
      })

    });
  

    
  }
  onSubmit(){
    this.createNewResturant = {
      name: this.registration.get('name')?.value,
      location: {
        address: this.registration.get('location')?.get('address')?.value,
        city: this.registration.get('location')?.get('city')?.value,
        state: this.registration.get('location')?.get('state')?.value,
        zip: this.registration.get('location')?.get('zip')?.value
      },
      coordinates: {
        latitude: this.registration.get('coordinates')?.get('latitude')?.value,
        longitude: this.registration.get('coordinates')?.get('longitude')?.value
      },
      phone: this.registration.get('phone')?.value,
      email: this.registration.get('email')?.value,
      
    };


    this.createNewUser={
      name:this.registration.get('manager')?.get('name')?.value,
      address:this.registration.get('manager')?.get('address')?.value,
      email:this.registration.get('manager')?.get('email')?.value,
      password:this.registration.get('manager')?.get('password')?.value,
      phoneNumber:this.registration.get('manager')?.get('phoneNumber')?.value,
      panNumber:this.registration.get('manager')?.get('panNumber')?.value,
      position:this.registration.get('manager')?.get('position')?.value,
    }
    console.log(this.registration.value)
    console.log(this.createNewResturant)
    console.log(this.createNewUser)
  }

}
