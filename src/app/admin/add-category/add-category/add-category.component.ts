import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  categorydata: any[] = [];
  categoryForm!:FormGroup;
  restaurant_id=sessionStorage.getItem('restaurant_id')
  restaurant_name=sessionStorage.getItem('restaurant_id')

  constructor(private fb:FormBuilder,  public dialogRef: MatDialogRef<AddCategoryComponent>,private api:ApiService){
    this.categoryForm=fb.group({
      name:['',[Validators.required]]
    })

  }

  onSubmit(){

  }


  saveChanges(): void {
   
  }

  addCategory(){
    const formValues = this.categoryForm.value;

    // Create a new object with name and resId
    const newCategory = {
      name: formValues.name,
      restaurant_id: this.restaurant_id,
      restaurant_name:this.restaurant_name

    };

    // Add the new object to the categorydata array
    this.categorydata.push(newCategory);

    // Log the updated data for debugging
    console.log('Updated Category Data:', this.categorydata);
      
    this.api.postCat(this.categorydata).subscribe(res=>{
      console.log(res)
    })
    

    // Optionally, close the dialog and pass the updated data
    this.dialogRef.close(this.categorydata);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}
