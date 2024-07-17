import { Title } from "@angular/platform-browser";

export interface Cardchild {
  item_name: string;
  image: string;
}

export interface Order {
  order: string;
  cards: Cardchild[];
}
