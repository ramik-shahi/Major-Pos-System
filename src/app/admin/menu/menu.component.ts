import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';


interface SelectedProduct {
  product: Product;
  table_name: string;
  billStatus: string;
  user_id:any;
  order_status:string;
  bill_id:any;
  restaurant_id:any;
  restaurant_name:any;
  order_date:any
}

interface Product {
  menu_id:string;
  item_name: string;
  price: string;
  rating: number;
  image: string;
  item_quantity: number;
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


 orders: SelectedProduct[] = [];

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
        menu_id:item._id,
        item_name: item.item_name,
        price: item.item_price,
        rating: item.item_rating,
        image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg',
        item_quantity: 0,
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
      product.item_name.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    if (product.item_quantity > 0) {
      product.selected = !product.selected;
    }

    if (product.selected && product.item_quantity > 0) {
      this.orders.push({ product,
        table_name: this.table_number, 
        billStatus: 'Pending' ,
        user_id:sessionStorage.getItem('user_id')?.toString(),
        order_status:'Pending',
        bill_id:null,
        restaurant_id:sessionStorage.getItem('restaurant_id')?.toString(),
        restaurant_name:sessionStorage.getItem('restaurant_name')?.toString(),
        order_date:Date.now()

      });-
      console.log(product);
    } else {
      const index = this.orders.findIndex(p => p.product.item_name === product.item_name);
      if (index !== -1) {
        this.orders.splice(index, 1);
      }
    }
  }

  increaseQuantity(product: Product) {
    if (!product.selected) {
      product.item_quantity = (product.item_quantity || 0) + 1;
    }
  }

  decreaseQuantity(product: Product) {
    if (product.item_quantity && product.item_quantity > 0 && !product.selected) {
      product.item_quantity--;
    }
  }

  onSubmit() {

    const orderPayload= {
      orders: this.orders.map(order => ({
        menu_id: order.product.menu_id,
        user_id: order.user_id,
        table_name: order.table_name,
        item_name: order.product.item_name,
        item_quantity: order.product.item_quantity,
        order_date: order.order_date,
        order_status: order.order_status,
        bill_id: order.bill_id,
        restaurant_id: order.restaurant_id,
        restaurant_name: order.restaurant_name
      }))
    };
    this.apiservice.postOrder(orderPayload).subscribe(res=>{
      console.log(res);
    })
    console.log(orderPayload);

  }

  categories_s(category: any) {
    console.log(category);
  }
}
