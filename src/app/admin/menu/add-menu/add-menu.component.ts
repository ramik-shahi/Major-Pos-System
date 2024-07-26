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
    this.api.getCategory(resId).subscribe(
      (response: { _id: string, name: string, restaurant_id: string, restaurant_name: string }[]) => {
        console.log('API Response:', response);
        this.category = response; // Assign entire response, not just names
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
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
    if (!this.menuForm) {
      console.error('Form is not initialized');
      return;
    }
  
    const controls = {
      nameControl: this.menuForm.get('name'),
      priceControl: this.menuForm.get('price'),
      descriptionControl: this.menuForm.get('description'),
      positionControl: this.menuForm.get('position'),
      imageControl : this.menuForm.get('image')
    };

    for (const [controlName, control] of Object.entries(controls)) {
      console.log(`${controlName}:`, control?.value);
    }

    if (Object.values(controls).some(control => control === null)) {
      console.error('One or more form controls are missing');
      return;
    }

    const restaurant_id = sessionStorage.getItem('restaurant_id') || '';
    console.log("restuarant Id :"+restaurant_id);
    
    const restaurant_name = sessionStorage.getItem('res_name') || '';

    const menuFormData = new FormData();
    menuFormData.append('item_name', controls.nameControl?.value || '');
    menuFormData.append('item_price', controls.priceControl?.value || '');
    menuFormData.append('item_description', controls.descriptionControl?.value || '');
    menuFormData.append('item_category', controls.positionControl?.value || '');

    if (controls.imageControl?.value) {
      menuFormData.append('image', controls.imageControl.value);
    } else {
      console.error('Image control is missing or empty');
    }

    menuFormData.append('restaurant_id', restaurant_id);
    menuFormData.append('restaurant_name', restaurant_name);

    menuFormData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.api.addMenu(menuFormData).subscribe({
      next: (res) => {
        console.log('Menu added:', res);
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Menu addition error:', err);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

