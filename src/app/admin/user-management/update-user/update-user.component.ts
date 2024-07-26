
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
      user_id:[''],
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
            user_id: user._id,
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
    if(!this.employeeForm){
      console.error('Form is not initialized');
      return;
    }

    const controls = {
      idcontrol: this.employeeForm.get('user_id'),
      namecontrol : this.employeeForm.get('name'),
      addresscontrol : this.employeeForm.get('address'),
      emailcontrol : this.employeeForm.get('email'),
      passworcontrol : this.employeeForm.get('password'),
      phonecontrol : this.employeeForm.get('phoneNumber'),
      pancontrol : this.employeeForm.get('panNumber'),
      positioncontrol : this.employeeForm.get('position'),
      imagecontrol : this.employeeForm.get('image')
    };

    for (const [controlName, control] of Object.entries(controls)) {
      console.log(`${controlName}:`, control?.value);
    }

    const missingControls = Object.entries(controls).filter(([controlName, control]) => control === null || control === undefined)
    .map(([controlName]) => controlName);

    // Log missing controls
    if (missingControls.length > 0) {
    console.error('The following form controls are missing or empty:', missingControls.join(', '));
    return;
    }

    const restaurant_id = sessionStorage.getItem('restaurant_id');
    const restaurant_name = sessionStorage.getItem('res_name');

    console.log("restaurant_name :",restaurant_name);

    const userFormData = new FormData();

    userFormData.append('user_id',controls.idcontrol?.value || '');
    userFormData.append('name',controls.namecontrol?.value || '');
    userFormData.append('email',controls.emailcontrol?.value || '');
    userFormData.append('phone_no',controls.phonecontrol?.value || '');
    userFormData.append('position',controls.positioncontrol?.value || '');
    userFormData.append('pan_no',controls.pancontrol?.value || '');
    userFormData.append('address',controls.addresscontrol?.value || '');
    userFormData.append('restaurant_id', restaurant_id! || '');
    userFormData.append('restaurant_name',restaurant_name! || '');

    if(controls.imagecontrol?.value){
      userFormData.append('image',controls.imagecontrol?.value);
    }else{
      console.error('image control is missing or empty');
    }

    this.api.updateUser(userFormData).subscribe({
      next:(res)=>{
        console.log('user added: ', res);
        this.dialogRef.close();
      },
      error: (err)=>{
        console.error('user addition error:',err);
      }
    });
 
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
