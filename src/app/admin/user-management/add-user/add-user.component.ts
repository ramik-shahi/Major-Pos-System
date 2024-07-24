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
    if (!this.employeeForm) {
      console.error('Form is not initialized');
      return;
    }
  
    const controls = {
      nameControl: this.employeeForm.get('name'),
      addressControl: this.employeeForm.get('address'),
      emailControl: this.employeeForm.get('email'),
      passwordControl: this.employeeForm.get('password'),
      phoneNumberControl: this.employeeForm.get('phoneNumber'),
      imageControl: this.employeeForm.get('image'),
      panNumberControl: this.employeeForm.get('panNumber'),
      positionControl: this.employeeForm.get('position')
    };
  
    // console.log('Form Controls:', {
    //   nameControl: controls.nameControl?.value || 'Control is null',
    //   addressControl: controls.addressControl?.value || 'Control is null',
    //   emailControl: controls.emailControl?.value || 'Control is null',
    //   passwordControl: controls.passwordControl?.value || 'Control is null',
    //   phoneNumberControl: controls.phoneNumberControl?.value || 'Control is null',
    //   imageControl: controls.imageControl?.value || 'Control is null',
    //   panNumberControl: controls.panNumberControl?.value || 'Control is null',
    //   positionControl: controls.positionControl?.value || 'Control is null'
    // });
  
    if (Object.values(controls).some(control => control === null)) {
      console.error('One or more form controls are missing');
      return;
    }
    
    const restaurant_id = sessionStorage.getItem('restaurant_id');

    const userform = new FormData(); 
    userform.append('name', controls.nameControl?.value || '');
    userform.append('address', controls.addressControl?.value || '');
    userform.append('email', controls.emailControl?.value || '');
    userform.append('password', controls.passwordControl?.value || '');
    userform.append('phoneNumber', controls.phoneNumberControl?.value || '');
    
    if (controls.imageControl?.value) {
      userform.append('image', controls.imageControl.value);
    } else {
      console.error('Image control is missing or empty');
    }
    
    userform.append('panNumber', controls.panNumberControl?.value || '');
    userform.append('position', controls.positionControl?.value || '');
    userform.append('restaurant_id',restaurant_id!);
    userform.append('restaurant_name', 'hello');


    this.api.addemployee(userform).subscribe({
        next: (res) => {
            console.log("Registration response:", res);
            this.dialogRef.close();
        },
        error: (err) => {
            console.error("Registration error:", err);

        }
    });

    
}


  closeDialog(): void {
    this.dialogRef.close();
  }




}
