import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

interface Product {
  id:string;
  name: string;
  price: number;
  rating: number;
  image: string;
  quantity: number;
  selected?: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  searchTerm: string = '';
  selectedProducts: { product: Product }[] = [];

  categories = ['Drinks', 'Breakfast', 'Lunch', 'Dinner', 'Hot Drinks', 'Tea', 'Coffee', 'Cold Drinks'];

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  pageIndex = 0;
  table_number:any;

  constructor(private apiservice: ApiService,private activatedroute: ActivatedRoute) {
   
   }

  ngOnInit(): void {

    console.log('-------------------------')
   this.table_number=this.activatedroute.snapshot.paramMap.get('table_number'); 
   
    console.log('-------------------------')
    const resId = sessionStorage.getItem('restaurant_id');
    this.apiservice.getMenu(resId).subscribe((response: any[]) => {
      this.products = response.map(item => ({
        id:item._id,
        name: item.item_name,
        price: item.item_price,
        rating: item.item_rating,
        image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg',
        quantity: 0,
        selected: false
      }));
      this.filteredProducts = [...this.products];
      this.updatePaginatedProducts();
      console.log(response);
      console.log(this.products);
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
    if (product.quantity > 0) {
      product.selected = !product.selected;
    }

    if (product.selected && product.quantity > 0) {
      this.selectedProducts.push({ product});
      console.log(product);
    } else {
      const index = this.selectedProducts.findIndex(p => p.product.name === product.name);
      if (index !== -1) {
        this.selectedProducts.splice(index, 1);
      }
    }
  }

  increaseQuantity(product: Product) {
    if (!product.selected) {
      product.quantity = (product.quantity || 0) + 1;
    }
  }

  decreaseQuantity(product: Product) {
    if (product.quantity && product.quantity > 0 && !product.selected) {
      product.quantity--;
    }
  }

  onSubmit() {
    console.log(this.selectedProducts);

  }

  categories_s(category: any) {
    console.log(category);
  }
}
