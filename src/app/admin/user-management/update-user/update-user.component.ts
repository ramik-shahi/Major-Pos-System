
import { Component,Inject, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeForm } from '../../interface/employee.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  positions = ['waiter', 'manager', 'Designer', 'Analyst', 'Tester'];
  employeeForm: FormGroup;
  userId: any;
  constructor(private fb:FormBuilder,private api:ApiService,  public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: any } ){
      this.userId = data.userId; // Access the passed userId
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
  ngOnInit(): void {
    console.log('User ID in ngOnInit:', this.userId);
    const resId = sessionStorage.getItem('restaurant_id');
    if (this.userId && resId) {
      this.api.getUserById(resId, this.userId).subscribe(res => {
        // Assuming `res` is an array and you need the first item
        const user = res[0]; 
        if (user) {
          // Populate the form with user data
          this.employeeForm.patchValue({
            name: user.user_name,
            address: user.address,
            email: user.email,
            password: '',
            phoneNumber: user.user_phone_no,
            image: '',
            panNumber: user.pan_no,
            position: user.user_role
          });
        } else {
          console.error('User not found in the response');
        }
      }, error => {
        console.error('Error fetching user data:', error);
      });
    }
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
    // Logic to save changes (e.g., update employee details)
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
