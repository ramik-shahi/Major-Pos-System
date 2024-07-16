import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { PageEvent } from '@angular/material/paginator';

interface Product {
  name: string;
  price: number;
  rating: number;
  image: string;
  selected?: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  products: Product[] = [
    { name: 'Pizza', price: 5, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg', rating: 2 },
    { name: 'Salad', price: 3, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg', rating: 3 },
    { name: 'Coffee', price: 2, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg', rating: 4 },
    { name: 'Italian', price: 6, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg', rating: 5 },
    { name: 'Chicken', price: 5, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg', rating: 1 },
    { name: 'Burger', price: 5, image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg', rating: 2 }
  ];

  filteredProducts: Product[] = [...this.products];
  paginatedProducts: Product[] = [];
  searchTerm: string = '';
  selectedProducts: { product: Product, quantity: number }[] = [];

  categories = ['Drinks', 'Breakfast', 'Lunch', 'Dinner', 'Hot Drinks', 'Tea', 'Coffee', 'Cold Drinks'];

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex = 0;

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.updatePaginatedProducts();

    const itemData = {
      item_name: 'Pizza',
      item_price: 10.99,
      item_category: 'Food',
      item_pic: 'pizza.jpg',
      item_description: 'Delicious pizza with cheese and toppings',
      restaurant_id: 12345,
      restaurant_name: 'Pizza Place'
    };
    this.apiservice.test_Post(itemData).subscribe(response => {
      console.log(response);
    });
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProducts();
  }

  selectProduct(product: Product) {
    product.selected = !product.selected;
    if (product.selected) {
      this.selectedProducts.push({ product, quantity: 1 });
      console.log(product);
    } else {
      const index = this.selectedProducts.findIndex(p => p.product.name === product.name);
      if (index !== -1) {
        this.selectedProducts.splice(index, 1);
      }
    }
  }

  onSubmit() {
    console.log(this.selectedProducts);
  }
}
