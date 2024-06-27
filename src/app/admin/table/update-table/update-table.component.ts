import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-update-table',
  templateUrl: './update-table.component.html',
  styleUrls: ['./update-table.component.css']
})
export class UpdateTableComponent {
  tableForm:FormGroup;

  constructor(private fb:FormBuilder,  public dialogRef: MatDialogRef<UpdateTableComponent>,){
    this.tableForm=fb.group({
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
