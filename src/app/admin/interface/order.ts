import { Title } from "@angular/platform-browser";

export interface Cardchild {
  item_name: string;
  image: string;
}

export interface Order {
  _id: string; // Assuming there's an ID field
  order: string; // Table number as string
  item_name: string;
  image: string;
  // Add other properties as per your backend response structure
}