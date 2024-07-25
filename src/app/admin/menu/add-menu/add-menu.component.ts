import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  positions = ['Manager', 'Waiter', 'KItchen', 'Reception','edit'];
  category:any[] = [];
 menuForm!:FormGroup;
  constructor(private api:ApiService,private fb:FormBuilder,public dialogRef: MatDialogRef<AddMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }){
      this.menuForm=fb.group({
        name: [''],
      price: [''],
      description:[''],
      
      image:['null'],
      
      position:['']

      })

  }
  ngOnInit(): void {
    const resId = sessionStorage.getItem('restaurant_id') || '';
    // this.api.getCategory(resId).subscribe(
    //   (response: { _id: string, name: string, restaurant_id: string, restaurant_name: string }[]) => {
    //     console.log('API Response:', response);
    //     this.category = response.map(cat => cat.name); // Extract category names
    //     console.log('Category Names:', this.category);
    //   },
    //   error => {
    //     console.error('Error fetching categories', error);
    //   }
    // );

    this.api.getCategory(resId).subscribe(
      res=>{
        this.category=res
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.menuForm.patchValue({
        image: file
      });
    }
  }
  saveChanges() {
    console.log(this.menuForm.value);
  }


}
