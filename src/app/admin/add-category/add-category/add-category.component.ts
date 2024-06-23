import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categoryForm!:FormGroup;

  constructor(private fb:FormBuilder,  public dialogRef: MatDialogRef<AddCategoryComponent>,){
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
