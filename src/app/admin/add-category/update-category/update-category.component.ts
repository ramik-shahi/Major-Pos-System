import { Component } from '@angular/core';

import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {
  categoryForm!:FormGroup;

  constructor(private fb:FormBuilder,  public dialogRef: MatDialogRef<UpdateCategoryComponent>,){
    this.categoryForm=fb.group({
      name:['',[Validators.required]]
    })

  }

  onSubmit(){

  }


  saveChanges(): void {
    // Logic to save changes (e.g., update employee details)
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}
