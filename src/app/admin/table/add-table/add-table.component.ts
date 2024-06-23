import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent {
  tableForm:FormGroup;

  constructor(private fb:FormBuilder,  public dialogRef: MatDialogRef<AddTableComponent>,){
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
