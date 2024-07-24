
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
  positions = ['Manager', 'Developer', 'Designer', 'Analyst', 'Tester'];
  employeeForm: FormGroup;
  constructor(private fb:FormBuilder,private api:ApiService,  public dialogRef: MatDialogRef<UpdateUserComponent>,
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
  ngOnInit(): void {
    const resId = sessionStorage.getItem('restaurant_id');
    const user_id = sessionStorage.getItem('user_id');
    
    this.api.getUserById(resId,user_id).subscribe(res=>{
      console.log(res)
    })
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
