import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent implements OnInit {
  tableForm:FormGroup;
  resId=sessionStorage.getItem('restaurant_id')
  resName=sessionStorage.getItem('res_name')
  categorydata: any[] = [];

  constructor(private fb:FormBuilder,  public dialogRef: MatDialogRef<AddTableComponent>,private api:ApiService){
    this.tableForm=fb.group({
      name:['',[Validators.required]]
    })

  }
  ngOnInit(): void {
    
  }

  onSubmit(){

  }


  saveChanges(): void {
    // Logic to save changes (e.g., update employee details)

    // Create a new object with name and resId
    const newTable = {
      table_name: this.tableForm.value.name,
      restaurant_id: this.resId,
      restaurant_name:this.resName,
      table_status:'Available'


    };

    this.api.addtable(newTable).subscribe(res=>{
      console.log(res)
    })

    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
