// menu.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';

interface Product {
  name: string;
  price: number;
  rating: number;
  image: string;
  selected?: boolean; // Define the selected property as optional
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit{
  ngOnInit(): void {
    const itemData = {

      item_name: 'Pizza',
      item_price: 10.99,
      item_category: 'Food',
      item_pic: 'pizza.jpg',
      item_description: 'Delicious pizza with cheese and toppings',
      restaurant_id: 12345,
      restaurant_name: 'Pizza Place'
    };
    // this.apiservice.test_Post(itemData).subscribe(Response=>{
    //   console.log(Response)
    // })

  }

  constructor(private apiservice:ApiService){

  }
  selectedProducts: { product: Product, quantity: number }[] = [];

  categories = ['Drinks', 'Breakfast', 'Lunch', 'Dinner', 'Hot Drinks', 'Tea', 'Coffee', 'Cold Drinks'];

 products :Product[] = [
    { name: 'Pizza', price: 5, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg' , rating : 2 },
    { name: 'Salad', price: 3, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg' , rating : 3 },
    { name: 'Coffee', price: 2, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg' , rating : 4 },
    { name: 'Italian', price: 6, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg' , rating : 5 },
    { name: 'Chicken', price: 5, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg' , rating : 1 },
    { name:   'Burger', price: 5, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg' , rating : 2 }
  ];

  // isSelected(product: Product): boolean {
  //   return this.selectedProducts.some(p => p.product.name === product.name);
  // }

  selectProduct(product: Product) {
    product.selected = !product.selected;
    if (product.selected) {
      this.selectedProducts.push({ product, quantity: 1 });
      console.log(product)
    } else {
      const index = this.selectedProducts.findIndex(p => p.product.name === product.name);
      if (index !== -1) {
        this.selectedProducts.splice(index, 1);
      }
    }
  }
  onSubmit(){
    console.log(this.selectedProducts)
  }
}
