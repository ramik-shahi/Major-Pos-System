import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registration: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registration = this.fb.group({
      name: ['', Validators.required],
      location: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
      }),
      coordinates: this.fb.group({
        latitude: [0, Validators.required],
        longitude: [0, Validators.required],
      }),
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      manager: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        panNumber: ['']
      })
    });
  }

  onSubmit() {
    if (this.registration.valid) {
      console.log('Form Submitted!', this.registration.value);
    }
  }
}
