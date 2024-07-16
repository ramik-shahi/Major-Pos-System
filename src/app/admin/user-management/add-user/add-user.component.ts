import { Component,Inject  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeForm } from '../../interface/employee.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  positions = ['Manager', 'Waiter', 'KItchen', 'Reception'];
  employeeForm: FormGroup;
  constructor(private fb:FormBuilder, private api:ApiService, public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }){
    this.employeeForm=fb.group({
      name: [''],
      address: [''],
      email:[''],
      password:[''],
      phoneNumber:[''],
      image:['null'],
      panNumber:[''],
      position:['']


    });

  }

  onSubmit() {
    console.log(this.employeeForm.value);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.employeeForm.patchValue({
        image: file
      });
    }
  }


  saveChanges(): void {
    const userData = {
        name: this.employeeForm.value.name,
        email: this.employeeForm.value.email,
        password: this.employeeForm.value.password,
        phone_no: this.employeeForm.value.phoneNumber,
        pic: this.employeeForm.value.image,
        position: this.employeeForm.value.position,
        pan_no: this.employeeForm.value.panNumber,
        address: this.employeeForm.value.address,
        restaurant_id: sessionStorage.getItem('restaurant_id'),
        restaurant_name: 'hello'
    };

    console.log("User data to save:", userData);

    this.api.registration(userData).subscribe({
        next: (res) => {
            console.log("Registration response:", res);
            // Handle success scenario
        },
        error: (err) => {
            console.error("Registration error:", err);
            // Handle error scenario
        }
    });

    this.dialogRef.close();
}


  closeDialog(): void {
    this.dialogRef.close();
  }




}
