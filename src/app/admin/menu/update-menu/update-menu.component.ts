import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {
  category:any[] = [];
  menuForm!:FormGroup;
  menuid:any


  constructor(private api:ApiService,private fb:FormBuilder,public dialogRef: MatDialogRef<UpdateMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: any }){
      this.menuid=data.userId

      console.log("this is menu id",this.menuid)
      this.menuForm=fb.group({
      menu_id:[''],
      name: [''],
      price: [''],
      description:[''],
      image:['null'],
      category:['']
      })


  }
  ngOnInit(): void {
    const resId = sessionStorage.getItem('restaurant_id') || '';
  

    this.api.getCategory(resId).subscribe(
      res=>{
        this.category=res
      }
    )
      
    this.api.getMenuOne(resId,this.menuid).subscribe(res=>{
     
      const menu = res[0]; 
      console.log("---------------")
      console.log(res)
      console.log("---------------")
      this.api.getMenupic(resId,this.menuid).subscribe(
        tempmenu=>{

          const image = tempmenu.item_pic;

          if(tempmenu){
            this.menuForm.patchValue({
              menu_id: this.menuid,
              image: image,
              name:res.item_name,
              price:res.item_price,
              description:res.item_description,
              category:res.item_category
            })
          }

        }
      );
      

    })
   
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
    if(!this.menuForm){
      console.log("Form is not initialized");
      return;
    }
    console.log("menu id:",this.menuid);
    const controls = {
      idcontrols: this.menuForm.get('menu_id'),
      namecontrols: this.menuForm.get('name'),
      descriptioncontrol: this.menuForm.get('description'),
      pricecontrol: this.menuForm.get('price'),
      categorycontrol: this.menuForm.get('category'),
      imagecontrol: this.menuForm.get('image')
    };

    const restaurant_id = sessionStorage.getItem('restaurant_id');
    const restaurant_name = sessionStorage.getItem('res_name');

    const menuFormData = new FormData();

    menuFormData.append('menu_id', controls.idcontrols?.value || '');
    menuFormData.append('item_name', controls.namecontrols?.value || '');
    menuFormData.append('item_price', controls.pricecontrol?.value || '');
    menuFormData.append('item_category', controls.categorycontrol?.value || '');


    if(controls.imagecontrol?.value){
      menuFormData.append('image',controls.imagecontrol?.value);
    }else{
      console.error('image control is missing or empty');
    }

    menuFormData.append('item_description', controls.descriptioncontrol?.value || '');
    menuFormData.append('restaurant_id', restaurant_id! || '');
    menuFormData.append('restaurant_name', restaurant_name! || '');

    this.api.updatemenu(menuFormData).subscribe({
      next:(res)=>{
        console.log('menu added:',res);
        this.dialogRef.close();
      },
      error:(err)=>{
        console.error('menu addition error:',err);
      }
    });

    console.log(this.menuForm.value);
  }


}
