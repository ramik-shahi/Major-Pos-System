import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';


@Component({
  selector: 'app-add-product-inventory',
  templateUrl: './add-product-inventory.component.html',
  styleUrls: ['./add-product-inventory.component.css']
})
export class AddProductInventoryComponent implements OnInit {
  constructor(private fb:FormBuilder,  public dialogRef: MatDialogRef<AddProductInventoryComponent>,private api:ApiService){
    this.addProduct=fb.group({
      name:['',[Validators.required]]
    })

  }

  addProduct:FormGroup;
  resId=sessionStorage.getItem('restaurant_id')
  resName=sessionStorage.getItem('res_name')
  ngOnInit(): void {
    
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  onSubmit(){}
  saveChanges(){}


}
